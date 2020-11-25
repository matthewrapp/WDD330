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
        let idToRemove = event.target.getAttribute('data-id');
        let elementToDelete = event.target.parentElement.parentElement;
        myLink.deleteLink(idToRemove, elementToDelete);
    }

    if (event.target.className == "edit") {
        // making only 1 edit box
        let editSection = document.getElementById('editSection');
        if (editSection != null) {
            editSection.remove();
        }

        let listElement = event.target.parentElement.parentElement;
        let listElemenetChildren = listElement.children;
        for (let i = 0; i < listElemenetChildren.length; i++) {
            if (listElemenetChildren[i].localName == 'a') {
                // store the 'a' element in a variable
                let hyperlink = listElemenetChildren[i];
                myLink.editLink(listElement, hyperlink);
            }
            // if (listElemenetChildren[i].localName == 'p') {
            //     let title = listElemenetChildren[i];
            //     myLink.editName(listElement, title);
            // }
        }
    }
}