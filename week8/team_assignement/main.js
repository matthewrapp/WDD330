// create variables
const url = "https://swapi.dev/api/";
const people = "people/";
const vehicles = "vehicles/";
const films = "films/";
const planets = "planets/";
const species = "species/";

// convert to JSON
function convertToJson(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(response.statusText);
    }
}

// Get Data from URL
async function getData(url) {
    // await says don't move on until this line finishes
    let data = await fetch(url).then(convertToJson);

    if (data.next) {
        let nextBtn = document.getElementById("nextBtn");
        // add nextURL to the button
        nextBtn.setAttribute("data-url", data.next);
    }
    if (data.previous) {
        let prevBtn = document.getElementById("prevBtn");
        // add prevURL to the button
        prevBtn.setAttribute("data-url", data.previous);
    }
    // display people here
    displayData(data.results);
    console.log(data);
}

// Add event listener for the buttons
function btnClicked(event) {
    getData(event.target.dataset.url);
}

document.getElementById("nextBtn").addEventListener('click', btnClicked);
document.getElementById("prevBtn").addEventListener('click', btnClicked);

// Display List of Data
function displayData(list) {
    const listElement = document.getElementById('listElement');
    // map
    const newArray = list.map((item) => {
        return `<li data-url="${item.url}">${item.name}</li>`;
    });
    listElement.innerHTML = newArray.join('');
}

async function itemClicked(event) {
    // console.log(event.target.dataset.url);
    const details = await fetch(event.target.dataset.url).then(convertToJson);
    console.log(details);
    displayDetails(details);
}

document.getElementById('listElement').addEventListener('click', itemClicked);

function displayDetails(details) {
    let name = details.name;
    let birthYear = details.birth_year;
    let height = details.height;
    let starships = details.starships;
    let vehicles = details.vehicles;

    let starshipsData = [];
    let vehiclesData = [];

    // get data for starships
    starships.forEach(async (starship) => {
        let starshipData = await fetch(starship).then(convertToJson);
        starshipsData.push(starshipData);
    });

    // get data for vehicles
    vehicles.forEach(async (vehicle) => {
        let vehicleData = await fetch(vehicle).then(convertToJson);
        vehiclesData.push(vehicleData);
    });

    console.log(vehiclesData);

    setTimeout(() => {
        // map through each item in starshipsData
        const starshipInnerData = starshipsData.map((item) => {
            return `
            <div class="starship-container">
            <p>Name: ${item.name}</p>
            <p>Class: ${item.starship_class}</p>
            <p>Price: ${item.cost_in_credits}</p>
            <p>Model: ${item.model}</p>
            <p>Manufacturer: ${item.manufacturer}</p>
            </div>`
        });

        // map through each item in vehiclesData
        const vehicleInnerData = vehiclesData.map((item) => {
            return `
            <div class="starship-container">
            <p>Name: ${item.name}</p>
            <p>Class: ${item.vehicle_class}</p>
            <p>Price: ${item.cost_in_credits}</p>
            <p>Model: ${item.model}</p>
            <p>Manufacturer: ${item.manufacturer}</p>
            </div>`
        });

        const detailsDiv = document.getElementById("detailsDiv");
        const detailsHTML =
            `<ul>
            <li>${name}</li>
            <li>Born: ${birthYear}</li>
            <li>Height: ${height} Inches</li>
            <h3>Starships:</h3>
            <li>${starshipInnerData.join('')} </li>
            <h3>Vehicles:</h3>
            <li>${vehicleInnerData.join('')}</li>
        </ul>`;

        detailsDiv.innerHTML = detailsHTML;

    }, 500);
};

let concat = url + people;
getData(concat);