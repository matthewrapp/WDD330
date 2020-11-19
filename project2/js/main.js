import {
    AllLinks
} from './link.js';

import {
    formatUrl,
    targetAction,
    qs
} from './utilities.js';


// create instance of class AllLinks
export const myLink = new AllLinks("#displayLinks", 'links');


const mobileMenuBtn = document.getElementById('mobileMenuBtn');
mobileMenuBtn.addEventListener('click', () => {
    let mobileMenu = document.getElementById('sidebar');
    mobileMenu.classList.toggle('shownavigation');
    console.log(window)
    window.addEventListener("resize", () => {
        if (window.outerWidth >= '660') {
            mobileMenu.classList.remove('shownavigation');
        }
    })
})
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
        // create an instance of AllLinks class and add a new link
        myLink.addNewLink(linkNameValue, formatUrl(linkUrlValue));
        // reset whole form
        form.reset();
    }
});

// get trash button and store in variable
// add event listener to delete button
const trashBtn = qs('body');
trashBtn.addEventListener('click', targetAction);

// load the links alraedy stored in local storage
window.onload = (event) => {
    myLink.loadLinks();
}