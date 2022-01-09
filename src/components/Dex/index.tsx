import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { ICookies } from "../../libs/interface";
import History from "./history";
import Owned from "./own";

interface Props {
  props: PropsItems;
}

interface PropsItems {
  pokemons: Array<ICookies> | null;
  release: Array<ICookies> | null;
  onRelease: (index: number) => void;
  isTab: number;
  onTab: (tab: number) => void;
}

const DexComponent: FC<Props> = ({ props }) => {
  const { pokemons, release, onRelease, isTab, onTab } = props;

  const history = useNavigate();

  return (
    <div className="contianer mx-5 lg:mx-24 ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Pokemon List | Pokecatch | Catch A Wild Pokemon</title>
        <link rel="Pokecatch" href="https://pokecatch-tokopedia.netlify.app/" />
      </Helmet>
      <main>
        <div className="flex items-center justify-center lg:justify-end">
          <div className="home-switch -mt-8 mb-8 lg:-mt-24 lg:mb-16 w-fit px-4 py-2 flex justify-around items-center">
            <div
              onClick={() => onTab(1)}
              className={`${
                isTab === 1 ? "home-switch-active  " : ""
              }  cursor-pointer py-1 px-5 `}
            >
              Keep
            </div>
            <div
              onClick={() => onTab(2)}
              className={`${
                isTab === 2 ? "home-switch-active  " : ""
              } cursor-pointer py-1 px-5 `}
            >
              History
            </div>
          </div>
        </div>
        {isTab === 1 && pokemons ? (
          <Owned props={{ pokemons, loading: false, onRelease }} />
        ) : isTab === 2 && release ? (
          <History props={{ pokemons: release, loading: false }} />
        ) : (
          <div className="flex items-center justify-center h-screen-m ">
            <div className="mt-44 lg:mt-14">
              <div className="flex items-center justify-center">
                <img src={"/assets/poke-shadow.png"} alt="pokeball" />
              </div>
              <p className="font-semi text-lg text-center my-5">
                you don't have a {isTab === 2 && "history "} pokemon yet
              </p>
              <div className="flex items-center justify-center">
                <div
                  onClick={() => history("/")}
                  className="card-catch w-fit px-5 py-2 hover:bg-yellow-400 flex items-center justfy-between"
                >
                  <p className="font-semi ">Go!! Catch a Pokemon</p>
                  <img
                    src="/assets/pokecatch.png"
                    alt="logo-pokemon"
                    className="w-5 h-auto ml-3 cursor-pointer "
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DexComponent;
