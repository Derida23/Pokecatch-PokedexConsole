import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { autoid, autom, upperCase } from "../../libs";
import { IDetail } from "../../libs/interface";
import Loader from "../Main/Loading";

interface Props {
  props: PropsItems;
}

interface PropsItems {
  loading: boolean;
  pokemon: IDetail | null;
  isTab: number;
  onTab: (tab: number) => void;
}

const DetailComponent: FC<Props> = ({ props }) => {
  const { loading, pokemon, isTab, onTab } = props;
  const location = useLocation();

  return (
    <div className="contianer mx-5 lg:mx-24 ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {upperCase(location.pathname.split("/")[2])} | Catch A Wild Pokemon |
          Tokopedia
        </title>
        <link rel="Pokecatch" href="https://pokecatch-tokopedia.netlify.app/" />
      </Helmet>
      <main className="mb-8 -mt-8 lg:-mt-20">
        <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center justify-center ">
              {loading ? (
                <Loader props={{ text: false }} />
              ) : (
                <div className="relative w-full ">
                  <div className="absolute right-10 lg:right-52 inset-y-24 z-index">
                    <img src={"/assets/poke-shadow.png"} alt="pokeball" />
                  </div>
                  <div className="absolute  bottom-0 left-24 ">
                    <img src={"/assets/dots.svg"} alt="dots" className="w-24" />
                  </div>
                  <div className="">
                    <p className="font-semi text-center">
                      {`#${autoid(pokemon?.id ?? 0)}`}
                    </p>
                    {/* Name Pokemon */}
                    <div className="flex items-center justify-center">
                      <img
                        src={"/assets/pokesmall.png"}
                        alt="pokesmall"
                        className="mr-2"
                      />
                      <p className="font-extra text-3xl tracking-widest text-black-0">
                        {upperCase(location.pathname.split("/")[2])}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <img
                      src={`${process.env.REACT_APP_ARTWORK}${
                        pokemon?.id ?? 0
                      }.png`}
                      alt="pokemon"
                      className="w-72 "
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center mt-6 lg:mt-4">
              <div className="card-catch px-5 py-2 hover:bg-yellow-400 flex items-center justfy-between">
                <img
                  src="/assets/pokecatch.png"
                  alt="logo-pokemon"
                  className="w-8 h-auto mr-2 cursor-pointer animate-bounce"
                />
                <p className="font-semi ">
                  Catch {upperCase(location.pathname.split("/")[2])}
                </p>
              </div>
            </div>
          </div>
          <div className="card w-full lg:w-9/12 px-6 py-3">
            <div className="mb-8">
              <div
                className={`home-switch px-1 py-2 flex justify-around items-center`}
              >
                <div
                  onClick={() => onTab(1)}
                  className={`${
                    isTab === 1 ? "home-switch-active  " : ""
                  }  cursor-pointer py-1 px-5 `}
                >
                  About
                </div>
                <div
                  onClick={() => onTab(2)}
                  className={`${
                    isTab === 2 ? "home-switch-active  " : ""
                  } cursor-pointer py-1 px-5 `}
                >
                  Stats
                </div>
                <div
                  onClick={() => onTab(3)}
                  className={`${
                    isTab === 3 ? "home-switch-active  " : ""
                  } cursor-pointer py-1 px-5 `}
                >
                  Moves
                </div>
              </div>
            </div>
            {isTab === 1 && (
              <div className="w-full lg:px-7">
                <div className="grid grid-rows-1 grid-cols-3 gap-3 mb-3">
                  <p className="font-semi">Types</p>
                  <div className="flex  col-span-2 items-center ">
                    {pokemon?.types.map((type, index) => (
                      <div
                        key={index}
                        className="bg-yellow-200 px-3 text-base text-black-0 rounded-md mr-2"
                      >
                        {upperCase(type.type.name)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-rows-1 grid-cols-3 gap-3 mb-3">
                  <p className="font-semi">Height</p>
                  <p className="col-span-2">
                    {autom(pokemon?.height ?? 0)} (m)
                  </p>
                </div>
                <div className="grid grid-rows-1 grid-cols-3 gap-3 mb-3">
                  <p className="font-semi">Weight</p>
                  <p className="col-span-2">
                    {autom(pokemon?.weight ?? 0)} (kg)
                  </p>
                </div>
                <div className="grid grid-rows-1 grid-cols-3 gap-3 mb-1">
                  <p className="font-semi">Abilities</p>
                  <div className="col-span-2">
                    {pokemon?.abilities.map((ability, index) => (
                      <div className="flex items-center mb-3">
                        <img
                          src={"/assets/pikachu.png"}
                          alt="abilities"
                          className="w-4 mr-2"
                        />
                        <div
                          key={index}
                          className="bg-yellow-200 w-fit px-3 text-base text-black-0 rounded-md mr-2"
                        >
                          {upperCase(ability.ability.name)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-rows-1 grid-cols-3 gap-3 mb-3">
                  <p className="font-semi">Experience</p>
                  <p className="col-span-2">
                    {pokemon?.base_experience ?? 0} (Exp)
                  </p>
                </div>
              </div>
            )}

            {isTab === 2 && (
              <div className="w-full lg:px-10">
                {pokemon?.stats.map((stat, index) => (
                  <div className="mb-3">
                    <div
                      key={index}
                      className="flex items-center justify-between mb-1"
                    >
                      <div className="flex items-center">
                        <img
                          src={`/assets/stats/${stat.stat.name}.png`}
                          alt="hp-icon"
                          className="mr-2 "
                        />
                        <p className="font-semi ">
                          {upperCase(stat.stat.name)}
                        </p>
                      </div>
                      <p className="font-semi ">{stat.base_stat}</p>
                    </div>

                    <div className="relative w-full h-2 bg-red-100 rounded-lg ">
                      <div
                        className=" h-2 bg-yellow-400 rounded-lg"
                        style={{
                          width: (stat.base_stat / 100) * 100 + "%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isTab === 3 && (
              <div className="overflow-y-scroll moves-scroll h-80 -mr-3">
                <div className="grid grid-rows-1 grid-cols-3 gap-5 mb-3 pr-3">
                  {pokemon?.moves.map((move, index) => (
                    <div
                      key={index}
                      className="border border-dashed py-2 hover:border-yellow-400"
                    >
                      <p className="text-center text-sm">{move.move.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailComponent;
