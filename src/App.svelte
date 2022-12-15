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

  function retriveItems(){
      let element1 = localStorage.getItem('squadElmt1')
      let element2 = localStorage.getItem('squadElmt2')
      let element3 = localStorage.getItem('squadElmt3')
      let element4 = localStorage.getItem('squadElmt4')
      let element5 = localStorage.getItem('squadElmt5')
      let element6 = localStorage.getItem('squadElmt6')
      return [element1, element2, element3, element4, element5, element6]
  }

    let elemntArr = retriveItems()

    elemntArr.forEach((element) => {
      if (element != null){
        pokemonsValue.push(element)
      }
    })
  
  
  function addPkmn(){
    if (pkmsCurrent.length == 6){
      noMorePkm = true;
    }
    if (!noMorePkm){
      pkmsCurrent.push(pkm)
      pokemons.set(pkmsCurrent)
    }
  }

  function removeItems(){
    localStorage.removeItem('squadElmt1')
    localStorage.removeItem('squadElmt2')
    localStorage.removeItem('squadElmt3')
    localStorage.removeItem('squadElmt4')
    localStorage.removeItem('squadElmt5')
    localStorage.removeItem('squadElmt6')
  }

  function saveSquad(){
    removeItems()
    let count = 1 
    pkmsCurrent.forEach((element) => {
      
      localStorage.setItem(`squadElmt${count}`, element)
      count++;
    })
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
  <button class="button is-primary is-light" on:click={removeItems}>
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