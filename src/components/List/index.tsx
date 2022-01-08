import React, { FC } from "react";
import { autoid, upperCase, useWindowsSize } from "../../libs";
import { IFilterGet, IListPokemon, IPokemons } from "../../libs/interface";
import { Button } from "../Main/Button";
import Loader from "../Main/Loading";
import { Helmet } from "react-helmet";
import { InfiniteScrollWeb } from "../Main/Scroll";
import Pokemons from "./pokemons";

interface Props {
  props: PropsItems;
}

interface PropsItems {
  master: IListPokemon;
  pokemons: Array<IPokemons>;
  loading: boolean;
  filter: IFilterGet;
  onPage: (page: number) => void;
}

const ListComponent: FC<Props> = ({ props }) => {
  const { pokemons, loading, filter, onPage } = props;
  const size = useWindowsSize();

  return (
    <div className="contianer mx-5 lg:mx-24 ">
      {/* Header */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          List Pokemon | Pokecatch | Catch A Wild Pokemon | Tokopedia
        </title>
        <link rel="Pokecatch" href="" />
      </Helmet>
      <header className="flex items-center justify-between mt-5 mb-12 lg:mb-24">
        <img
          src="/assets/pokemon-logo.png"
          alt="logo-pokemon"
          className="w-32 lg:w-36 h-auto -mt-4 cursor-pointer"
        />
        <div className="card-catch px-5 py-2 hover:bg-yellow-400 flex items-center justfy-between">
          <p className="font-semi ">0 Catch</p>
          <img
            src="/assets/pokecatch.png"
            alt="logo-pokemon"
            className="w-5 h-auto ml-3 cursor-pointer rotater linearer infiniter"
          />
        </div>
      </header>

      {/* List Pokemon */}
      <main>
        <InfiniteScrollWeb
          hasMoreData={size.width > 640 ? false : true}
          isLoading={loading}
          onBottomHit={() => onPage(filter.page + 1)}
          loadOnMount={true}
        >
          <Pokemons props={{ pokemons, loading }} />
        </InfiniteScrollWeb>
        {size.width > 640 ? (
          <div className="flex items-center justify-center mb-5">
            <Button onClick={() => onPage(filter.page + 1)}>
              {loading ? (
                <div className="flex items-center ">
                  <img
                    src="/assets/pokeloading.png"
                    alt="loading-pokemon"
                    className="w-5 mr-2 rotater linearer infiniter"
                  />
                  <p>Loading</p>
                </div>
              ) : (
                <p>Load More</p>
              )}
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center mb-5 -mt-3">
            <img
              src="/assets/pokeloading.png"
              alt="loading-pokemon"
              className="w-8 mr-2 rotater linearer infiniter"
            />
            <p className="text-lg">Loading</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ListComponent;
