import http from "./http";

export async function fetchPokemonById(id) {
  const response = await http.get(`/pokemon/${id}`);
  return response.data;
}
