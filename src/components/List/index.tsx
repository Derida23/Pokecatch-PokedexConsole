import React, { FC } from "react";
import { useWindowsSize } from "../../libs";
import {
  ICookies,
  IFilterGet,
  IListPokemon,
  IPokemons,
} from "../../libs/interface";
import { Button } from "../Main/Button";
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
  monCookies: Array<ICookies> | null;
}

const ListComponent: FC<Props> = ({ props }) => {
  const { pokemons, loading, filter, onPage, monCookies } = props;
  const size = useWindowsSize();

  return (
    <div className="contianer mx-5 lg:mx-24 ">
      {/* Header */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          List Pokemon | Pokecatch | Catch A Wild Pokemon | Tokopedia
        </title>
        <link rel="Pokecatch" href="https://pokecatch-tokopedia.netlify.app/" />
      </Helmet>

      {/* List Pokemon */}
      <main>
        <InfiniteScrollWeb
          hasMoreData={size.width > 640 ? false : true}
          isLoading={loading}
          onBottomHit={() => onPage(filter.page + 1)}
          loadOnMount={true}
        >
          <Pokemons props={{ pokemons, loading, monCookies }} />
        </InfiniteScrollWeb>
        {size.width > 640 ? (
          <div className="flex items-center justify-center mb-5">
            <Button disabled={loading} onClick={() => onPage(filter.page + 1)}>
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
