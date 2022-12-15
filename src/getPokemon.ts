import { PokemonClient } from 'pokenode-ts';

const api = new PokemonClient();

async function getPokemon(pokeom: any) {

    let result = await api
        .getPokemonByName(pokeom)
        .then((data) => console.log(data.name)) // will output "Luxray"
        .catch((error) => console.error(error));
    
    return result;
}