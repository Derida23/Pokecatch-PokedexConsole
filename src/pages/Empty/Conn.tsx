import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const history = useNavigate();

  return (
    <div className="contianer mx-5 lg:mx-24 ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Error Connection | Pokecatch | Catch A Wild Pokemon | Tokopedia
        </title>
        <link rel="Pokecatch" href="https://pokecatch-tokopedia.netlify.app/" />
      </Helmet>
      <main>
        <div className="flex items-center justify-center h-screen-m ">
          <div className="mt-44 lg:mt-14">
            <div className="flex items-center justify-center">
              <img src={"/assets/poke-shadow.png"} alt="pokeball" />
            </div>
            <p className="font-semi text-4xl text-center my-10">
              Error Connection
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
      </main>
    </div>
  );
};

export default ErrorPage;
