import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_POKEMONS } from "../../api/Queries";
import ListComponent from "../../components/List";
import { IFilterGet, IListPokemon, IPokemons } from "../../libs/interface";

const ListPage: React.FC = () => {
  const [master, setMaster] = useState<IListPokemon>({});
  const [pokemons, setPokemons] = useState<Array<IPokemons>>([]);
  const [filter, setFilter] = useState<IFilterGet>({
    page: 0,
    limit: 21,
    offset: 0,
  });

  const { loading, data, fetchMore } = useQuery(GET_POKEMONS, {
    notifyOnNetworkStatusChange: true,
    variables: { limit: filter.limit, offset: filter.offset },
    fetchPolicy: "network-only",
    onCompleted: () => GetPokemons(),
  });

  const GetPokemons = () => {
    setMaster(data);

    if (filter.page === 1) {
      setPokemons(data.pokemons.results);
    }
  };

  const AddPokemons = (fetchMoreResult: IListPokemon) => {
    const vanilla = JSON.parse(JSON.stringify(pokemons));

    vanilla.push(...(fetchMoreResult?.pokemons?.results ?? []));
    setPokemons(vanilla);
  };

  const onPage = (page: number) => {
    const temporary = { ...filter, page, offset: (page - 1) * 21 };
    setFilter(temporary);

    fetchMore({
      variables: { limit: temporary.limit, offset: temporary.offset },
      updateQuery: (prev, { fetchMoreResult }) => {
        AddPokemons(fetchMoreResult);
      },
    });
  };

  return (
    <div>
      <ListComponent props={{ master, pokemons, loading, filter, onPage }} />
    </div>
  );
};

export default ListPage;
