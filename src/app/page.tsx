import axios from "axios";
import Image from "next/image";
import { parsedEnv } from "../../env";
import { Pokemon, PokemonAPIResponse } from "./types/pokemon";
import Link from "next/link";

export default async function Home() {
  // Solicitud inicial para obtener la lista de Pokémon
  const response = await axios.get<PokemonAPIResponse>(`${parsedEnv.API_URL}/pokemon`);
  const pokemonSummaries = response.data.results;

  // Hacer solicitudes adicionales para obtener los detalles de cada Pokémon
  const pokemonPromises = pokemonSummaries.map(async (summary) => {
    const detailResponse = await axios.get<Pokemon>(summary.url);
    return detailResponse.data;
  });

  // Esperar a que todas las solicitudes se completen
  const pokemons = await Promise.all(pokemonPromises);

  return (
    <main>
      <h1>Listado de pokemones</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <h2>{pokemon.name}</h2>
            <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={96} height={96} />
            <Link href={`${pokemon.id}`}>Ver detalles</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
