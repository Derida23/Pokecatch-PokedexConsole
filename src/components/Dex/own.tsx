import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { autoid, upperCase } from "../../libs";
import { ICookies } from "../../libs/interface";
import Loader from "../Main/Loading";

interface Props {
  props: PropsItems;
}

interface PropsItems {
  pokemons: Array<ICookies> | null;
  loading: boolean;
  onRelease: (index: number) => void;
}

const Owned: FC<Props> = ({ props }) => {
  const { pokemons, loading, onRelease } = props;
  const history = useNavigate();

  return (
    <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-14 mb-8">
      {pokemons &&
        pokemons.map((item, index) => (
          <div
            key={index}
            className="card-pokemon p-8 lg:p-10 relative flex items-center justify-between hover:text-yellow-500"
          >
            <div onClick={() => history(`/pokemon/${item.name}`)}>
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
                  <p className="font-semi text-lg italic text-black-0 mt-1">
                    {upperCase(item?.nickname ?? "")}
                  </p>
                </div>
              )}
            </div>

            {loading && <Loader props={{ text: false }} />}

            <div
              className="absolute z-10 top-3 left-3"
              onClick={() => onRelease(index)}
            >
              <img
                src={`/assets/remove.png`}
                alt="remove"
                className="mr-2 w-5 lg:w-auto"
              />
            </div>

            <div className="absolute z-10 -top-5 lg:-top-12 right-0 lg:-right-5 ">
              <img
                src={"/assets/poke-shadow.png"}
                alt="pokeball"
                className="w-24"
              />
            </div>

            <div className="absolute z-10 top-12 -left-0 ">
              <img src={"/assets/dots.svg"} alt="dots" className="w-24" />
            </div>

            <div
              onClick={() => history(`/pokemon/${item.name}`)}
              className="absolute z-10 -top-8 lg:-top-14 -right-1 lg:-right-5 "
            >
              {!loading && (
                <img
                  src={`${process.env.REACT_APP_ARTWORK}${item?.id ?? 0}.png`}
                  alt={item?.name ?? ""}
                  className="w-40 xl:w-44 h-auto "
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Owned;
