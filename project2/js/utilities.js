import {
    myLink
} from './main.js';

// quick query selector
export function qs(selector) {
    return document.querySelector(selector);
}

// ready data

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

export function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let a = 1;

    let backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    return backgroundColor;
}

export function setRandomColor(element, color) {
    element.style.backgroundColor = color;
}

// export function setImg(id, img) {
//     let element = document.getElementById(id);
//     element.style.background = `url(data:image/png;base64,${img})`;
//     element.style.backgroundSize = 'cover';
//     element.style.backgroundRepeat = 'no-repeat';
// }

export function setImg(id, img) {
    let element = document.getElementById(id);
    element.style.backgroundImage = `url('${img}')`;
    element.style.backgroundSize = 'cover';
    element.style.backgroundRepeat = 'no-repeat';
}

export function targetAction(event) {
    // delete the links from the list
    // if pressed on button outside of the trashcan icon
    if (event.target.className == "trash") {
        let idToRemove = event.target.getAttribute('data-id');
        let elementToDelete = event.target.parentElement.parentElement.parentElement;
        myLink.links.deleteLink(idToRemove, elementToDelete);
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
                myLink.links.editLink(listElement, hyperlink);

            }
        }
    }

    if (event.target.id == "previewBtn") {
        let adminSection = document.getElementById("adminContent");
        let sidebarSection = document.getElementById("sidebar");
        let headerSection = document.getElementById("header");
        adminSection.style.display = "none";
        sidebarSection.style.display = "none";
        headerSection.style.display = "none";

        myLink.displayLandingPage();
    }

    // upload profile img
    if (event.target.id == "thumbnailImgUpload" && event.target.files.length > 0) {
        myLink.uploadProfileImg(event);
    }

    // upload background img
    if (event.target.id == "backgroundImgUpload" && event.target.files.length > 0) {
        myLink.uploadBackgroundImg(event);
    }

    if (event.target.id == "linksNavItem") {
        myLink.navigateToLinksPage();
    }

    if (event.target.id == "profileNavItem") {
        myLink.navigateToProfilePage();
    }
}

export function onchangeAction(event) {
    if (event.target.id == "inputColor") {
        myLink.selectProfileColor(event);
    }


}