<script lang="ts">
    export let pokemon: any;
    let sprite;

    import { PokemonClient } from 'pokenode-ts';

    const api = new PokemonClient();

    async function getPokemon(pokeom: any) {
        let result = await api
            .getPokemonByName(pokeom)
            .then((data) => {
                sprite = data.sprites.front_default
            }) // will output "Luxray"
            .catch((error) => console.error(error));
    
            return result;
        }

    let promise = getPokemon(pokemon)


</script>

{#await promise}
    <p>Loading</p>
{:then img}
    <img src={sprite} alt="pkmImg" width="150" height="150"/>
{/await}