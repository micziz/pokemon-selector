<script lang="ts">
	import { pokemons } from './store.js';
  import Pokemon from "./Pokemon.svelte";
  let pkm: any;
  let noMorePkm = false;

  let pokemonsValue;
  let pkmsCurrent = [];

  pokemons.subscribe(value => {
		pokemonsValue = value;
	});

  

    let elemntArr = JSON.parse(localStorage.getItem('squad'))
    
    for (const key in elemntArr) {
      pokemonsValue.push(elemntArr[key])
    }
    
    
  
  function addPkmn(){
    if (pkmsCurrent.length == 6){
      noMorePkm = true;
    }
    if (!noMorePkm){
      pkmsCurrent.push(pkm)
      pokemons.set(pkmsCurrent)
    }
  }

  function saveSquad(){
    localStorage.removeItem('squad')
    let squadObj = {}
    let count = 1 
    pkmsCurrent.forEach((element) => {
      squadObj[`squadElmt${count}`] = element
      count++;
    })
    localStorage.setItem('squad', JSON.stringify(squadObj))
  }
</script>

<h1 class="title is-1" id="titolo">Fai la tua squadra pokemon!</h1>

<form action="" on:submit|preventDefault={addPkmn}>
  <div id="form">
    <input type="text" name="" id="formSubmit" bind:value={pkm}>
  </div>
  
  <div id="form-btn">
    <input type="submit" value="Inserisci" class="button is-primary is-light">
  </div>
  </form>

<div id="pokemons">
  {#each pokemonsValue as pokemon}
    <Pokemon pokemon={pokemon}/>
  {/each}
</div>

{#if noMorePkm}
  <h1 id="noMrPkm">Non puoi inserire piu pokemon</h1>
{/if}

<div id="btn-save">
  <button class="button is-primary is-light" on:click={saveSquad}>
    Salva La tua Squadra!
  </button>
</div>

<div id="btn-remove">
  <button class="button is-primary is-light" on:click={() => {
    localStorage.removeItem('squad')
  }}>
    Cancella La tua squadra
  </button>
</div>

<style>
  #form{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #formSubmit{
    width: 24rem;
    font-size:14pt;
  }
  
  #form-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }

  #titolo{
    text-align: center;
    margin-top: 3rem;
  }

  #pokemons{
    display: flex;
    justify-content: center;
    align-items: center;  
  }

  #noMrPkm{
    text-align: center;
    margin-top: 2rem;
  }

  #btn-save{
    display: flex;
    justify-content: center;
    align-items: center;  
    margin-top: 12rem;
  }

  #btn-remove{
    display: flex;
    justify-content: center;
    align-items: center;  
    margin-top: 2rem;
  }
</style>