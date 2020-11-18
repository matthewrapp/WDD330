import {
    AllLinks
} from './link.js';

import {
    formatUrl
} from './utilities.js';


// create instance of class AllLinks
const myLink = new AllLinks("#displayLinks", 'links');

// get button and store in variable
const buttonAdd = document.getElementById('buttonAdd');

// add eventlistener to button
buttonAdd.addEventListener('click', () => {
    // get form
    const form = document.getElementById('addLinkForm');
    // get input boxes and store in variable
    const linkNameElement = document.getElementById('linkName');
    const linkUrlElement = document.getElementById('linkUrl');
    let linkNameValue = linkNameElement.value;
    let linkUrlValue = linkUrlElement.value;

    if (linkNameValue == "" || linkNameValue == null && linkUrlValue == "" || linkUrlValue == null) {
        alert('Must input something');
    } else {
        // validate that url is a url
        console.log(formatUrl(linkUrlValue));
        // create an instance of AllLinks class and add a new link
        myLink.addNewLink(linkNameValue, formatUrl(linkUrlValue));
        // reset whole form
        form.reset();
    }
});

// load the links alraedy stored in local storage
window.onload = (event) => {
    myLink.loadLinks();
}

// function displayLinks(link) {
//     const displayLinksList = document.getElementById('displayLinks');
//     displayLinksList.innerHTML = results.map((link) => {
//         // map is create when you want to convert something
//         return `<li>${link.name}</li>
//         <li>${link.url}`;
//     }).join('');
// }