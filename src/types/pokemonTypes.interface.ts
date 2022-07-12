export interface PokemonListResponse {
  limit:  number;
  offset: number;
  count:  number;
  items:  PokemonSummary[];
}

export interface PokemonSummary {
  id:         string;
  name:       string;
  number:     number;
  image:      string;
  isFavorite: boolean;
  types:      [string];
}

export interface Pokemon {
  id:                 string;
  name:               string;
  number:             number;
  image:              string;
  isFavorite:         boolean;
  types:              [string];
  weight:             Eight;
  height:             Eight;
  evolutions:         PokemonSummary[];
  previousEvolutions: PokemonSummary[];
  maxCP:              number;
  maxHP:              number;
  sound:              string;
}

export interface PaginationTypes {
  limit: number;
  offset: number;
  count: number;
}

export interface paginationMetaTypes {
  currentPage: number;
  totalPages: number;
}

export interface Eight {
  minimum: number;
  maximum: number;
}
