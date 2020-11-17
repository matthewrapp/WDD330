/* When user types in input box (addEventListener) - watch for keyup
    get what they typed
    make a call to the search api with the query string
    when the results come back
        forEach result, generate HTML, and add to our HTML list
*/

const baseURL = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY";

function convertToJson(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(response.statusText);
    }
}

async function getSearchResults(query) {
    // const options = {
    //     method: "post",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         generalSearchInput: query,
    //         includeDatatypes: {
    //             "Survey (FNDDS)": true,
    //             Foundation: true,
    //             Branded: false
    //         },
    //         requireAllWords: "true",
    //         ingredients: "bacon"
    //     })
    // };
    const results = await fetch(baseURL + `&query=${query}`).then(convertToJson);
    // return data
    return results;
}

function renderSearchResults(results) {
    const resultsListElement = document.getElementById('searchResults');
    resultsListElement.innerHTML = results.map((item) => {
        // map is create when you want to convert something
        return `<li>${item.description}</li>`
    }).join('');
}

export async function search(event) {
    const query = event.target.value;
    console.log(query);

    if (query.length > 2) {
        const results = await getSearchResults(query);
        console.log(results);
        renderSearchResults(results.foods);
    }
}