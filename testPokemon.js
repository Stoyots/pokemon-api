const pokemonCard = {
  bug: 'pokemon-api/img/plant.png',
  dark: 'darkCard.png',
  dragon: 'dragonCard.png',
  electric: 'electricCard.png',
  fairy: 'fairyCard.png',
  fighting: 'fightingCard.png',
  fire: 'fireCard.png',
  flying: 'flyCard.png',
  ghost: 'pokemon-api/img/psychique.png',
  grass: 'pokemon-api/img/plant.png',
  ground: 'pokemon-api/img/fight.png',
  ice: 'pokemon-api/img/water.png',
  normal: 'normalCard.png',
  poison: 'poisonCard.png',
  psychic: 'psyCard.png',
  rock: 'pokemon-api/img/fight.png',
  steel: 'pokemon-api/img/steel.png',
  water: 'waterCard.png'
}

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

document.addEventListener("DOMContentLoaded", function () {
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
      rickRollAudio.play();
      rickRollImage.style.display = 'block';
      image.style.display = 'none';
      namepokemon.style.display = 'none';
      number.style.display = 'none';
      weight.style.display = 'none';
      type.style.display = 'none';
      height.style.display = 'none';
      return;
    }

    rickRollAudio.pause();
    rickRollAudio.currentTime = 0;
    rickRollImage.style.display = 'none';
    image.style.display = 'block';
    namepokemon.style.display = 'block';
    number.style.display = 'block';
    weight.style.display = 'block';
    type.style.display = 'block';
    height.style.display = 'block';

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
        const cardImage = document.querySelector("#cardImage");
        const cardPath = imagePokemon(data.types[0].type.name);
        cardImage.src = cardPath;
      });
  }).catch((err) => {
    alert('Pokemon non trouvé', err);
  });

e.preventDefault();    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${name}`)
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
