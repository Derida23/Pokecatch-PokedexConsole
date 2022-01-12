import { useQuery } from "@apollo/client";
import React, { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DETAIL_POKEMON } from "../../api/Queries";
import { useStore } from "../../api/Store";
import DetailComponent from "../../components/Detail";
import PokeModal from "../../components/Main/Modal/PokeModal";
import { getCookies, setCookies, upperCase } from "../../libs";
import { ICookies, IDetail } from "../../libs/interface";

export interface IError {
  status: number;
  message: string;
}

const DetailPage: React.FC = () => {
  const location = useLocation();
  const history = useNavigate();
  const DEFAULT_ALERT = "Throwing Pokeball...";
  const { addTotal } = useStore();

  const [pokemon, setPokemon] = useState<IDetail | null>(null);
  const [monCookies, setMonCookies] = useState<Array<ICookies> | null>(null);
  const [owned, setOwned] = useState<boolean>(false);
  const [isTab, setTab] = useState<number>(1);

  // const [isCatch, setCatch] = useState<boolean>(false);
  const [catchOpen, setCatchOpen] = useState<boolean>(false);
  const [isAlert, setAlert] = useState<string>(DEFAULT_ALERT);
  const [nickname, setNickname] = useState<string>("");
  const [isError, setError] = useState<IError>({ status: 0, message: "" });

  const { loading, data } = useQuery(DETAIL_POKEMON, {
    notifyOnNetworkStatusChange: true,
    variables: {
      name: location.pathname.split("/")[2].toString().toLowerCase(),
    },
    fetchPolicy: "network-only",
    onCompleted: async () => await GetPokemon(),
    onError: (error) => errorHandler(error.message),
  });

  const GetPokemon = async () => {
    setPokemon(data.pokemon);

    const temporary = await getCookies("__UUPK");

    if (temporary) {
      const field: Array<ICookies> = JSON.parse(temporary).filter(
        (item: { name: string }) => item.name === data?.pokemon?.name ?? ""
      );

      if (field.length > 0) {
        setOwned(true);
      }
      setMonCookies(JSON.parse(temporary));
    }
  };

  const errorHandler = (message: string) => {
    if (message === "Request failed with status code 404") {
      history("/404");
    } else {
      history("/error-connection");
    }
  };

  const onTab = (tab: number) => {
    setTab(tab);
  };

  const onCatch = () => {
    setCatchOpen(true);
    let prob = onProb();

    setTimeout(() => {
      if (!prob) {
        // If Pokemon Cant Catch or Run
        setAlert(`Oops ${upperCase(pokemon?.name ?? "")} Run...`);

        setTimeout(() => {
          setCatchOpen(false);
          setAlert(DEFAULT_ALERT);
        }, 2000);
      } else {
        // If Pokemon Catch
        setAlert(`Wow You Catch ${upperCase(pokemon?.name ?? "")}...`);
      }
    }, 2500);
  };

  const onProb = () => {
    if (Math.random() >= 0.5) {
      return true;
    } else {
      return false;
    }
  };

  const onSave = async (id: number, pokename: string) => {
    if (!nickname) {
      //Error Nick Name Empty
      setError({ status: 402, message: "hey your pokemon needs a nickname" });
    } else {
      // Setup Cookies
      let dataModal = [{ id, name: pokename, nickname }];
      let dataCookies = await getCookies("__UUPK");

      if (!dataCookies) {
        await setCookies("__UUPK", JSON.stringify(dataModal));
      } else {
        let vanilla = JSON.parse(dataCookies);

        vanilla.push(...dataModal);
        await setCookies("__UUPK", JSON.stringify(vanilla));
      }

      setAlert("Well Done, Check My Pokemon List...");
      addTotal();
      setTimeout(() => {
        setCatchOpen(false);

        setTimeout(() => {
          history("/pokedex");
        }, 1000);
      }, 2000);
    }
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const param = pokemon?.name ?? "";

    if (value.length <= 16) {
      setNickname(value);
    }

    if (monCookies) {
      const field = monCookies.filter(
        (item) => item.name === param && item.nickname === value
      );

      if (field.length > 0) {
        setError({ status: 403, message: "you have the same name" });
      } else {
        setError({ status: 0, message: "" });
      }
    } else {
      setError({ status: 0, message: "" });
    }
  };

  return (
    <div>
      <PokeModal
        isOpen={catchOpen}
        onClose={() => {
          setCatchOpen(false);
          setAlert(DEFAULT_ALERT);
          setError({ status: 0, message: "" });
          setNickname("");
        }}
        alert={isAlert}
        pokemon={pokemon}
        onSave={onSave}
        nickname={nickname}
        isError={isError}
        onInput={(e) => onInput(e)}
      />
      <DetailComponent
        props={{ loading, pokemon, isTab, onTab, onCatch, owned }}
      />
    </div>
  );
};

export default DetailPage;
