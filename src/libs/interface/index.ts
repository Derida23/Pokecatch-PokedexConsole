export interface IFilterGet {
  page: number;
  limit: number;
  offset: number;
}

export interface IListPokemon {
  pokemons?: {
    count?: number;
    message?: string;
    next?: string;
    previous?: string;
    results: Array<IPokemons>;
    status?: boolean;
  };
}

export interface IPokemons {
  id: number;
  url: string;
  name: string;
  image: string;
  artwork: string;
  dreamworld: string;
}
