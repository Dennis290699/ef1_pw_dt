import { fetchPokemonById } from "./pokeApi";

const POKEMON_IDS = [1, 4, 7, 25, 39];

export async function getRandomPokemon() {
  const id = POKEMON_IDS[Math.floor(Math.random() * POKEMON_IDS.length)];

  const data = await fetchPokemonById(id);

  return {
    nombre: data.name,
    imagen: data.sprites.front_default
  };
}
