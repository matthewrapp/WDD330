// create variables
const url = "https://pokeapi.co/api/v2/type/3";
const detailsElement = document.getElementById('detailsElement');

function convertToJson(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(response.statusText);
    }
}

// older way of doing it
// function getPokemon(url) {
//     // fetch call
//     fetch(url).then(convertToJson).then((data) => {
//         let pokemon = data.pokemon;
//         console.log(pokemon);
//     });
// }

// doing same thing but with Async Await
async function getPokemonAsync(url) {
    // await says don't move on until this line finishes
    let pokemon = await fetch(url).then(convertToJson);
    let specificPokemon = pokemon.pokemon;
    console.log(specificPokemon);
    displayPokemon(pokemon.pokemon);
}

function displayPokemon(list) {
    const listElement = document.getElementById('listElement');
    // map
    const newArray = list.map((item) => {
        return `<li data-url="${item.pokemon.url}">${item.pokemon.name}</li>`;
    });
    listElement.innerHTML = newArray.join('');
    // console.log(newArray);
}

function displayDetails(detailsList) {
    const detailsElement = document.getElementById('detailsElement');
    const oneDetailElement = document.createElement('p');
    const detailsName = document.createTextNode(detailsList.name);
    oneDetailElement.appendChild(detailsName);
    detailsElement.appendChild(oneDetailElement);

    console.log(detailsList);
    console.log(detailsList.name);
}

async function pokemonClicked(event) {
    // console.log(event.target.dataset.url);
    const details = await fetch(event.target.dataset.url).then(convertToJson);
    displayDetails(details);
}

document.getElementById('listElement').addEventListener('click', pokemonClicked);


// getPokemon(url);
getPokemonAsync(url);