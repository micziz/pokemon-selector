<script lang="ts">
	import { pokemons } from './store.js';
  import Pokemon from "./Pokemon.svelte";
  let pkm: any;
  let noMorePkm = false;

  let pokemonsValue;
  let pkmsCurrent = [];

  let aboutTure = "false";
  let clicked = "false"

  pokemons.subscribe(value => {
		pokemonsValue = value;
	});

  let coustumName;
  let hasSquad = localStorage.getItem('hasSquad')
  if (hasSquad == "true"){
    coustumName = prompt('Nome della squadra salvata')
  
    let elemntArr = JSON.parse(localStorage.getItem(coustumName))
    if ( elemntArr !== null ){
      for (const key in elemntArr) {
        pokemonsValue.push(elemntArr[key])
        pkmsCurrent.push(elemntArr[key])
      }
    }
      
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
    let squadName = window.prompt('Nome della squadra', 'squad')
    if (squadName == null || squadName == "") {
      alert('Prompt cancellato!')
    } else {
      localStorage.setItem('hasSquad', 'true')
      localStorage.removeItem(coustumName)
      let squadObj = {}
      let count = 1 
      pkmsCurrent.forEach((element) => {
        squadObj[`squadElmt${count}`] = element
        count++;
      })
      localStorage.setItem(squadName, JSON.stringify(squadObj))
    }
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
    let squadDel = prompt('Squadra da cancellare')
    localStorage.removeItem(squadDel)
    localStorage.setItem('hasSquad', "false")
  }}>
    Cancella La tua squadra
  </button>
</div>


<div id="info">
  <button class="button is-primary is-light" on:click={() => {
    if (clicked == "false"){
      aboutTure = "true"
      clicked = "ture"
    } else {
      aboutTure = "false"
      clicked = "false"
    }
  }}>
    Piu Informazioni!
  </button>


</div>
<div id="info-true">
  {#if aboutTure == "true"}
    <h1 class="title is-1">Informazioni!</h1>
  
    <p>Questo progetto è stato creato da <a href="https://micziz.dev">micziz</a></p>
  
    <a href="https://github.com/micziz/pokemon-selector">Questo proggeto è open source!</a>
  {/if}
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

  #info{
    display: flex;
    justify-content: center;
    align-items: center;  
    margin-top: 2rem;
    margin-bottom: 4rem;
  }

  #info-true{
    text-align: center;    
    margin-top: 2rem;
    margin-bottom: 4rem;
  }
</style>