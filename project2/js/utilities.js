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

        let idToEdit = event.target.getAttribute('data-id');
        // this targets the li element ... maybe try targeting only the first parentElement but a sibling
        let listElement = event.target.parentElement.parentElement;
        let listElemenetChildren = listElement.children;
        for (let i = 0; i < listElemenetChildren.length; i++) {
            if (listElemenetChildren[i].localName == 'a') {
                // store the 'a' element in a variable
                let hyperlink = listElemenetChildren[i];

                // create div to store the new input boxes and buttons in
                let modal = document.createElement('div');

                // create input box
                let inputBox = document.createElement('input');
                inputBox.setAttribute("type", "url");
                inputBox.setAttribute("pattern", "https?://.+");
                inputBox.setAttribute("id", "linkUrl");
                inputBox.setAttribute("placeholder", hyperlink);

                // create button to finalize the edit
                let finalizeBtn = document.createElement('button');
                finalizeBtn.setAttribute("id", "buttonFinalize");
                finalizeBtn.setAttribute("type", "button");
                finalizeBtn.innerHTML = "Save";

                // append children to modal
                modal.appendChild(inputBox);
                modal.appendChild(finalizeBtn);

                // append modal to listElement
                listElement.appendChild(modal);

                // create an event listener for the finalizeBtn to save it into the original spot
                // finalizeBtn.addEventListener('click', myLink.editLink);
                finalizeBtn.addEventListener('click', () => {
                    console.log('hello');
                    let urlElement = document.getElementById('linkUrl');
                    let urlValue = urlElement.value;
                    let newInputValue = inputBox.value;
                    urlValue = newInputValue;
                    console.log(urlValue);
                });
            }
        }
    }
}