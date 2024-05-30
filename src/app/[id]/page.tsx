import axios from "axios";
import { parsedEnv } from "../../../env";
import { Pokemon } from "../types/pokemon";
import Image from "next/image";


type Props = {
    params: {
        id: string;
    };
}

export default async function Page({ params }: Props) {
    // Hacer la solicitud para obtener los detalles del Pokémon específico por ID
    const response = await axios.get<Pokemon>(`${parsedEnv.API_URL}/pokemon/${params.id}`);
    const pokemon = response.data;

    // Si no se encuentra el Pokémon, mostrar un mensaje de error
    if (!pokemon) {
        return <h1>No se encontraron resultados</h1>;
    }

    return (
        <main>
            <h1>{pokemon.name}</h1>
            <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={96} height={96} />
            <h2>Abilities:</h2>
            <ul>
                {pokemon.abilities.map((ability) => (
                    <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
            </ul>
        </main>
    );
}