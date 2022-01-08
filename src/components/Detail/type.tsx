import React from "react";
import { upperCase } from "../../libs";
import styles from "../../styles/Type.module.scss";

interface Props {
  props: PropsItems;
}

interface PropsItems {
  index: number;
  type: string;
}

const TypePokemon: React.FC<Props> = ({ props }) => {
  const { index, type } = props;
  const color: string = `t${type}`;

  console.log(color);
  return (
    <div
      key={index}
      className={`${
        type === "normal"
          ? styles.normal
          : type === "fire"
          ? styles.fire
          : type === "fighting"
          ? styles.fighting
          : type === "water"
          ? styles.water
          : type === "flying"
          ? styles.flying
          : type === "grass"
          ? styles.grass
          : type === "poison"
          ? styles.poison
          : type === "electric"
          ? styles.electric
          : type === "ground"
          ? styles.ground
          : type === "psychic"
          ? styles.psychic
          : type === "rock"
          ? styles.rock
          : type === "ice"
          ? styles.ice
          : type === "bug"
          ? styles.bug
          : type === "dragon"
          ? styles.dragon
          : type === "ghost"
          ? styles.ghost
          : type === "dark"
          ? styles.dark
          : type === "steel"
          ? styles.steel
          : type === "fairy"
          ? styles.fairy
          : styles.normal
      }  px-3 text-base text-black-0 rounded-md mr-2`}
    >
      {upperCase(type)}
    </div>
  );
};

export default TypePokemon;
