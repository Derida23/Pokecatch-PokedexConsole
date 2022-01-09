import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../api/Store";
import { getCookies } from "../../libs";

const Header = () => {
  const history = useNavigate();
  const { total, setTotal } = useStore();

  const cookies = async () => {
    const getCook = await getCookies("__UUPK");
    let total = 0;
    if (getCook) {
      total = JSON.parse(getCook).length;
    }

    return total;
  };

  useEffect(() => {
    (async () => {
      let response = await cookies();
      setTotal(response);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div
          onClick={() => history("/pokedex")}
          className="card-catch px-5 py-2 hover:bg-yellow-400 flex items-center justfy-between"
        >
          <p className="font-semi ">{total} Catch</p>
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
