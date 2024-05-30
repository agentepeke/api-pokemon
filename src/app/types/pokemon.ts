export type PokemonSummary = {
    name: string;
    url: string;
  };
  
export type PokemonAPIResponse = {
    results: PokemonSummary[];
};

export type Pokemon = {
    id: number;
    name: string;
    order: number;
    sprites: {
        front_default: string;
    };
    abilities: {
        ability: {
            name: string;
        };
    }[];
};


