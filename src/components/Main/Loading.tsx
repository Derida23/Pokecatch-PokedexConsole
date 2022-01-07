import React from "react";
import { FC } from "react";
interface Props {
  props: PropsItems;
}

interface PropsItems {
  text: boolean;
}

const Loader: FC<Props> = ({ props }) => {
  const { text } = props;
  return (
    <div>
      <img
        src="/assets/pokeloading.png"
        alt="loading-pokemon"
        className="w-10 mr-3 rotater linearer infiniter"
      />
      {text && <p className="text-black-0 ">Loading</p>}
    </div>
  );
};

export default Loader;
