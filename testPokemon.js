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



    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            image.src = `${data.sprites.other['official-artwork'].front_default}`;
            image.alt = `${data.name}`;
            namepokemon.textContent = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
            number.textContent = `N° : ${data.id}`;
            weight.textContent = `Weight : ${Math.round(data.weight/10)} kg`;
            type.textContent = `Type : ${translateType(data.types[0].type.name[i])}`;
            height.textContent = `Height : ${data.height*10} cm`

        }).catch((err) => {
            alert('Pokemon not found', err);
        });
    e.preventDefault();
    //prevents the default form submission behavior, ensuring that the page doesn't reload when the form is submitted.
}
document.querySelector('#search').addEventListener("click", getPokemon);

//map(index) à voir
