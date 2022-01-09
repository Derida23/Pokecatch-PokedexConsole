import React, { useEffect, useState } from "react";
import { useStore } from "../../api/Store";
import DexComponent from "../../components/Dex";
import { deleteCookies, getCookies, setCookies } from "../../libs";
import { ICookies } from "../../libs/interface";

const DexPage = () => {
  const [pokemons, setPokemons] = useState<Array<ICookies> | null>(null);
  const { minTotal } = useStore();

  useEffect(() => {
    GetPokemon();
  }, []);

  const GetPokemon = async () => {
    const temporary = await getCookies("__UUPK");

    if (temporary) {
      setPokemons(JSON.parse(temporary));
    }
  };

  const onRelease = async (index: number) => {
    const temporary = JSON.parse(JSON.stringify(pokemons));
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

  return <DexComponent props={{ pokemons, onRelease }} />;
};

export default DexPage;
