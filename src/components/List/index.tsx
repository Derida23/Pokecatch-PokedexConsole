import React, { FC } from "react";
import { autoid, upperCase, useWindowsSize } from "../../libs";
import { IFilterGet, IListPokemon, IPokemons } from "../../libs/interface";
import { Button } from "../Main/Button";
import Loader from "../Main/Loading";
import { Helmet } from "react-helmet";
import { InfiniteScroll } from "../Main/Scroll";

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
        <InfiniteScroll
          hasMoreData={size.width > 640 ? false : true}
          isLoading={loading}
          onBottomHit={() =>
            filter.page === 1 ? pokemons : onPage(filter.page + 1)
          }
          loadOnMount={true}
        >
          <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-14 mb-8">
            {pokemons.length > 0 &&
              pokemons.map((item, index) => (
                <div
                  key={index}
                  className="card-pokemon p-8 lg:p-10 relative flex items-center justify-between hover:text-yellow-500"
                >
                  <div>
                    {loading ? (
                      // <Loader props={{ text: false }} />
                      <div>
                        <div className="skleton" />
                        <div className="skleton-2 mt-3" />
                      </div>
                    ) : (
                      <div>
                        <p className="font-semi ">{autoid(item?.id ?? 0)}</p>
                        <p className="font-extra text-2xl text-black-0">
                          {upperCase(item?.name ?? "")}
                        </p>
                      </div>
                    )}
                  </div>

                  {loading && <Loader props={{ text: false }} />}

                  <div className="absolute z-index-10 -top-5 lg:-top-12 right-0 lg:-right-5 ">
                    <img
                      src={"/assets/poke-shadow.png"}
                      alt="pokeball"
                      className="w-24"
                    />
                  </div>

                  <div className="absolute z-index-10 top-8 -left-0 ">
                    <img src={"/assets/dots.svg"} alt="dots" className="w-24" />
                  </div>

                  <div className="absolute z-index-10 -top-8 lg:-top-14 -right-1 lg:-right-5 ">
                    {!loading && (
                      <img
                        src={item?.artwork ?? ""}
                        alt={item?.name ?? ""}
                        className="w-40 xl:w-44 h-auto "
                      />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </InfiniteScroll>
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
