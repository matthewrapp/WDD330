// API
const url = "https://pokeapi.co/api/v2/pokemon/";

// Write convertToJSON function
function convertToJSON(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Pokemon not found.", res);
    }
}

function doStuff(data) {
    console.log("first", data);
}

// function
function getPokemon() {
    const pokemonName = document.getElementById("userInput").value;
    // fetch - recognizes 3 data types: JSON, text(HTML, XML), blob (Tech term = binary data)
    const response = fetch(url + pokemonName)
        .then(convertToJSON)
        .then(doStuff)
        .catch((error) => {
            console.log(error);
        });
}

// On click
document.getElementById("submitBtn").addEventListener("click", getPokemon);

// returns a 'Promise'.... Think 'a promise to give you this information'
// console.log('second', response);

// Get foods call
function getFoods() {
    fetch("data.json").then(convertToJSON).then((data) => {
        console.log(data);
    });
}

getFoods();