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

