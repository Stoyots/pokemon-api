// const pokemonCard = {
//   bug : 'pokemon-api\img\plant.png',
//   dark :'pokemon-api\img\dark.png',
//   dragon :'pokemon-api\img\dragon.png',
//   electric :'https://p1.hiclipart.com/preview/805/502/518/blanks-classic-cards-pokemon-trading-card-png-clipart-thumbnail.jpg',
//   fairy :'pokemon-api\img\fairy.png',
//   fighting :'pokemon-api\img\fight.png',
//   fire :'pokemon-api\img\fire.png',
//   flying :'pokemon-api\img\normal.png',
//   ghost :'pokemon-api\img\psychique.png',
//   grass :'pokemon-api\img\plant.png',
//   ground :'pokemon-api\img\fight.png',
//   ice :'pokemon-api\img\water.png',
//   normal :'pokemon-api\img\normal.png',
//   poison :'pokemon-api\img\psychique.png',
//   psychic :'pokemon-api\img\psychique.png',
//   rock :'pokemon-api\img\fight.png',
//   steel :'pokemon-api\img\steel.png',
//   water :'pokemon-api\img\water.png'
// }

// function imagePokemon(text){
//   return pokemonCard[text]
// }


const pokemonType = {
    bug :'🦗',
    dark :'🔮',
    dragon :'🐉',
    electric :'⚡',
    fairy :'🦋',
    fighting :'🥊',
    fire :'🔥',
    flying :'🪶',
    ghost :'👻',
    grass :'🌿',
    ground :'⛰️',
    ice :'❄️',
    normal :'',
    poison :'☠️',
    psychic :'🌀',
    rock :'🪨',
    steel :'⚔️',
    water :'💧'
    }
    
  function translateType(text){
    return pokemonType[text]
  }
  console.log(translateType('steel'))
    
  const getPokemon = (e) => {
    const getname = document.querySelector("#pokemonName").value;
    const name = getname.toLowerCase();
    const image = document.querySelector("#imagepokemon");
    const namepokemon = document.querySelector("#namepokemon");
    const number = document.querySelector("#Number");
    const weight = document.querySelector("#weight");
    const type = document.querySelector("#type");
    const height = document.querySelector("#height")
    const img = document.querySelector('#pokemoncard')
  
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${name}`)
        .then((response) => response.json())
        .then((frenchData) => {
            const frenchName = frenchData.name;
            namepokemon.textContent = frenchName.charAt(0).toUpperCase() + frenchName.slice(1);
  
            fetch(`https://pokeapi.co/api/v2/pokemon/${frenchData.id}`)
                .then((response) => response.json())
                .then((data) => {
                  img.src = `${imagePokemon(`${data.types[0].type.name}`)}`;
                    image.src = `${data.sprites.other['official-artwork'].front_default}`;
                    image.alt = `${data.name}`;
                    number.textContent = `N° : ${data.id}`;
                    weight.textContent = `Poids : ${Math.round(data.weight/10)} kg`;
                    type.textContent = `Type : ${data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1)}`
                    height.textContent = `Taille : ${data.height*10} cm`
                });
        }).catch((err) => {
            alert('Pokemon not found', err);
        });
    e.preventDefault();
  }
  document.querySelector('#search').addEventListener("click", getPokemon);
  
  //map(index) à voir