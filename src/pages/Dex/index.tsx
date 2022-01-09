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
    const temporary = await getCookies("__UUPK");
    const vanilla = await getCookies("__UUPR");

    if (temporary) {
      setPokemons(JSON.parse(temporary));
    }

    if (vanilla) {
      setRelease(JSON.parse(vanilla));
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

      await GetPokemon();
    }
  };

  const onTab = (tab: number) => {
    setTab(tab);
  };

  return (
    <DexComponent props={{ pokemons, release, onRelease, isTab, onTab }} />
  );
};

export default DexPage;
