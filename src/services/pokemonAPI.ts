import { PokemonListResponse, Pokemon } from "../types/pokemonTypes.interface";

export const getAllPokemons = async (): Promise<PokemonListResponse> =>
  await fetch(
    'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon'
  ).then(val => val.json());

  export const getPokemon = async (id: string): Promise<Pokemon> =>
  await fetch(
    `https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}`
  ).then(val => val.json());

  export const getPokemonTypes = async (): Promise<String[]> =>
  await fetch(
    'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon-types'
  ).then(val => val.json());