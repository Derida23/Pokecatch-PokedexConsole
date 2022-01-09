import React, { useEffect, useState } from "react";
import { useStore } from "../../api/Store";
import DexComponent from "../../components/Dex";
import { deleteCookies, getCookies, setCookies } from "../../libs";
import { ICookies } from "../../libs/interface";

const DexPage = () => {
  const [pokemons, setPokemons] = useState<Array<ICookies> | null>(null);
  const [release, setRelease] = useState<Array<ICookies> | null>(null);
  const { minTotal } = useStore();
  const [isTab, setTab] = useState<number>(1);

  useEffect(() => {
    GetPokemon();
  }, []);

  const GetPokemon = async () => {
    const keep = await getCookies("__UUPK");
    const history = await getCookies("__UUPR");

    if (keep) {
      setPokemons(JSON.parse(keep));
    }

    if (history) {
      setRelease(JSON.parse(history));
    }
  };

  const onRelease = async (index: number) => {
    const temporary = JSON.parse(JSON.stringify(pokemons));
    await onStorage(temporary[index]);

    temporary.splice(index, 1);

    await setCookies("__UUPK", JSON.stringify(temporary));

    if (pokemons?.length === 1) {
      setPokemons(null);
      deleteCookies("__UUPK");
    } else {
      await GetPokemon();
    }
    minTotal();
  };

  const onStorage = async (data: Array<ICookies>) => {
    let receive = [];
    receive.push(data);

    let dataCookies = await getCookies("__UUPR");

    if (!dataCookies) {
      await setCookies("__UUPR", JSON.stringify(receive));
    } else {
      let vanilla = JSON.parse(dataCookies);

      vanilla.push(...receive);
      await setCookies("__UUPR", JSON.stringify(vanilla));
    }
  };

  const onTab = async (tab: number) => {
    setTab(tab);
    await GetPokemon();
  };

  return (
    <DexComponent props={{ pokemons, release, onRelease, isTab, onTab }} />
  );
};

export default DexPage;
