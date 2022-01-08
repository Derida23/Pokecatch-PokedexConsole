import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { DETAIL_POKEMON } from "../../api/Queries";
import DetailComponent from "../../components/Detail";
import { IDetail } from "../../libs/interface";

const DetailPage: React.FC = () => {
  const location = useLocation();
  const [pokemon, setPokemon] = useState<IDetail | null>(null);
  const [isTab, setTab] = useState<number>(1);

  const { loading, data } = useQuery(DETAIL_POKEMON, {
    notifyOnNetworkStatusChange: true,
    variables: { name: location.pathname.split("/")[2] },
    fetchPolicy: "network-only",
    onCompleted: () => GetPokemon(),
  });

  const GetPokemon = () => {
    setPokemon(data.pokemon);
  };

  const onTab = (tab: number) => {
    setTab(tab);
  };

  return <DetailComponent props={{ loading, pokemon, isTab, onTab }} />;
};

export default DetailPage;
