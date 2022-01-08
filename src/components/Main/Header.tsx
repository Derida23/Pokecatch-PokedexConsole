import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const history = useNavigate();
  return (
    <div className="contianer mx-5 lg:mx-24 ">
      <header className="flex items-center justify-between mt-5 mb-12 lg:mb-24">
        <div onClick={() => history("/")}>
          <img
            src="/assets/pokemon-logo.png"
            alt="logo-pokemon"
            className="w-32 lg:w-36 h-auto -mt-4 cursor-pointer"
          />
        </div>
        <div className="card-catch px-5 py-2 hover:bg-yellow-400 flex items-center justfy-between">
          <p className="font-semi ">0 Catch</p>
          <img
            src="/assets/pokecatch.png"
            alt="logo-pokemon"
            className="w-5 h-auto ml-3 cursor-pointer "
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
