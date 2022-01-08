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

export interface IDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  message?: string;
  status: boolean;
}
