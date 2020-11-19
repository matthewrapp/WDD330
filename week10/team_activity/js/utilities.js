export function convertToJson(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(response.statusText);
    }
}

export async function getJSON(url) {
    const data = await fetch(url).then(convertToJson).catch(function (error) {
        console.log(error);
    });
    return data;
}

// this will get your current location
export const getLocation = (options) => {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};