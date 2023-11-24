// const pokemonCard = {
//   bug: 'pokemon-api/img/plant.png',
//   dark: 'pokemon-api/img/dark.png',
//   dragon: 'pokemon-api/img/dragon.png',
//   electric: 'https://p1.hiclipart.com/preview/805/502/518/blanks-classic-cards-pokemon-trading-card-png-clipart-thumbnail.jpg',
//   fairy: 'pokemon-api/img/fairy.png',
//   fighting: 'pokemon-api/img/fight.png',
//   fire: 'pokemon-api/img/fire.png',
//   flying: 'pokemon-api/img/normal.png',
//   ghost: 'pokemon-api/img/psychique.png',
//   grass: 'pokemon-api/img/plant.png',
//   ground: 'pokemon-api/img/fight.png',
//   ice: 'pokemon-api/img/water.png',
//   normal: 'pokemon-api/img/normal.png',
//   poison: 'pokemon-api/img/psychique.png',
//   psychic: 'pokemon-api/img/psychique.png',
//   rock: 'pokemon-api/img/fight.png',
//   steel: 'pokemon-api/img/steel.png',
//   water: 'pokemon-api/img/water.png'
// }

function imagePokemon(text) {
  return pokemonCard[text]
}

const pokemonType = {
  bug: 'bug.png',
  dark: 'dark.png',
  dragon: 'dragon.png',
  electric: 'electr.png',
  fairy: 'fairy.png',
  fighting: 'fighting.png',
  fire: 'fire.png',
  flying: 'flying.png',
  ghost: 'ghost.png',
  grass: 'grass.png',
  ground: 'ground.png',
  ice: 'ice.png',
  normal: 'normal.png',
  poison: 'poison.png',
  psychic: 'psy.png',
  rock: 'rock.png',
  steel: 'steel.png',
  water: 'water.png'
}

function translateType(text) {
  return pokemonType[text]
}

// Ajout d'un événement pour détecter le chargement de la page
document.addEventListener("DOMContentLoaded", function() {
  const rickRollAudio = document.getElementById("rickRollAudio");
  const rickRollImage = document.getElementById("rickRollImage");

  const getPokemon = (e) => {
      const getname = document.querySelector("#pokemonName").value;
      const name = getname.toLowerCase();
      const image = document.querySelector("#imagepokemon");
      const namepokemon = document.querySelector("#namepokemon");
      const number = document.querySelector("#Number");
      const weight = document.querySelector("#weight");
      const type = document.querySelector("#type");
      const height = document.querySelector("#height");

      if (name === '0' || name === '898') {
          // Si le numéro est 0 ou 898, lance le rick roll
          rickRollAudio.play();
          rickRollImage.style.display = 'block';
          // Masque les informations Pokémon
          image.style.display = 'none';
          namepokemon.style.display = 'none';
          number.style.display = 'none';
          weight.style.display = 'none';
          type.style.display = 'none';
          height.style.display = 'none';
          return;
      }

      // Si le numéro n'est pas 0 ou 898, masque le rick roll
      rickRollAudio.pause();
      rickRollAudio.currentTime = 0;
      rickRollImage.style.display = 'none';
      // Affiche les informations Pokémon
      image.style.display = 'block';
      namepokemon.style.display = 'block';
      number.style.display = 'block';
      weight.style.display = 'block';
      type.style.display = 'block';
      height.style.display = 'block';

      // Continue avec la recherche Pokémon normale
      fetch(`https://pokebuildapi.fr/api/v1/pokemon/${name}`)
          .then((response) => response.json())
          .then((frenchData) => {
              const frenchName = frenchData.name;
              namepokemon.textContent = frenchName.charAt(0).toUpperCase() + frenchName.slice(1);

              fetch(`https://pokeapi.co/api/v2/pokemon/${frenchData.id}`)
                  .then((response) => response.json())
                  .then((data) => {
                      image.src = `${data.sprites.other['official-artwork'].front_default}`;
                      image.alt = `${data.name}`;
                      number.textContent = `N° : ${data.id}`;
                      weight.textContent = `Poids : ${Math.round(data.weight / 10)} kg`;
                      type.innerHTML = `Type : <img src="${translateType(data.types[0].type.name)}"/>`
                      height.textContent = `Taille : ${data.height * 10} cm`
                  });
          }).catch((err) => {
              alert('Pokemon non trouvé', err);
          });

      e.preventDefault();
  }

  document.querySelector('#search').addEventListener("click", getPokemon);
});
