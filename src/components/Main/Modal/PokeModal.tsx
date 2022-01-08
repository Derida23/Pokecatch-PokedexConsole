import React, { ChangeEvent, FC } from "react";
import { Input, Modal } from "antd";
import { IDetail } from "../../../libs/interface";
import { upperCase } from "../../../libs";
import { ButtonCatch, ButtonRelease } from "../Button";
import { IError } from "../../../pages/Detail";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  alert: string;
  pokemon: IDetail | null;
  onSave: (id: number, pokename: string) => void;
  nickname: string;
  isError: IError;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PokeModal: FC<Props> = ({
  isOpen,
  onClose,
  alert,
  pokemon,
  onSave,
  nickname,
  isError,
  onInput,
}) => {
  return (
    <Modal
      title={null}
      visible={isOpen}
      onOk={undefined}
      footer={null}
      closable={false}
      keyboard={false}
      width={400}
    >
      <div>
        <div className="flex items-center justify-center">
          <img
            src="/assets/pokecatch.png"
            alt="logo-pokemon"
            className={`h-auto mr-3 cursor-pointer ${
              alert.includes("Oops")
                ? "animate-bounce"
                : "rotater linearer infiniter"
            } ${alert.includes("Wow") && "hidden"}`}
          />
        </div>

        <p className="font-semi text-lg text-center mt-4">{alert}</p>

        {alert.includes("Wow") && (
          <div className="mt-8">
            <p className="font-semi text-lg text-center ">
              Give a Wild {upperCase(pokemon?.name ?? "")} Nickname
            </p>
            <div className="mt-3 w-full flex items-center justify-center ">
              <div className="w-9/12">
                <Input
                  type="text"
                  placeholder="sweet nickname..."
                  size="large"
                  value={nickname}
                  className=" w-full"
                  onChange={onInput}
                />
                {isError.status > 0 && (
                  <p className="text-red-400 ml-1 ">{isError?.message ?? ""}</p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center mt-5">
              <ButtonRelease onClick={onClose} className="mr-2">
                Release
              </ButtonRelease>
              <ButtonCatch
                disabled={isError.status === 403}
                onClick={() => onSave(pokemon?.id ?? 0, pokemon?.name ?? "")}
              >
                Catch
              </ButtonCatch>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PokeModal;
