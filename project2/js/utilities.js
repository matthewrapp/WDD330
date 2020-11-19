import {
    myLink
} from './main.js';

// quick query selector
export function qs(selector) {
    return document.querySelector(selector);
}

// retreive tasks from data store
export function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}
// save to tasks to data store
export function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// formatting url to have https
export function formatUrl(url) {
    var httpString = "http://";
    var httpsString = "https://";
    if (url.substr(0, httpString.length).toLowerCase() !== httpString && url.substr(0, httpsString.length).toLowerCase() !== httpsString)
        url = httpsString + url;
    return url;
}

export function targetAction(event) {
    // delete the links from the list
    // if pressed on button outside of the trashcan icon
    if (event.target.className == "trash") {
        console.log(event.target);
        let idToRemove = event.target.getAttribute('data-id');
        let elementToDelete = event.target.parentElement.parentElement;
        console.log(elementToDelete);
        myLink.deleteLink(idToRemove, elementToDelete);
    }

    if (event.target.className == "edit") {
        console.log(event);
        console.log(event.target);
        let idToEdit = event.target.getAttribute('data-id');
        // this targets the li element ... maybe try targeting only the first parentElement but a sibling
        console.log(event.target.parentElement.previousElementSibling);
        console.log(idToEdit);
    }
}