import {
    Page
} from './page.js';

import {
    formatUrl,
    targetAction,
    qs,
    onchangeAction
} from './utilities.js';


// create instance of class AllLinks
// consider changing the key to a dynamic variable that the user wants the page name to be (ex. VVRN or Lipp)
// export const myLink = new AllLinks("#displayLinks", 'links');
// Create page attach links to that page
export const myLink = new Page("Matthew Rapp");


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
        myLink.links.addNewLink(linkNameValue, formatUrl(linkUrlValue));
        // reset whole form
        form.reset();
    }
});

// get trash button and store in variable
// add event listener to delete button
const globalBtn = qs('body');
globalBtn.addEventListener('click', targetAction);

// let colorSelectorBtn = document.getElementById('inputColor');
// colorSelectorBtn.addEventListener('change', onchangeAction);

// upload profile image
let imgProfileUploadBtn = document.getElementById("thumbnailImgUpload");
imgProfileUploadBtn.addEventListener('change', targetAction);

// // upload header image
// let imgHeaderUploadBtn = document.getElementById("headerImgUpload");
// imgHeaderUploadBtn.addEventListener('change', targetAction);

// upload background image
let imgBackgroundUploadBtn = document.getElementById("backgroundImgUpload");
imgBackgroundUploadBtn.addEventListener('change', targetAction);

// load the links alraedy stored in local storage
window.onload = (event) => {
    myLink.links.loadLinks();
    setTimeout(() => {
        myLink.loadProfileImage();
        myLink.loadBackgroundImage();
    }, 1000);
    console.log(myLink.pageData);
    // myLink.loadProfileDetails();
    // console.log(myLink.key);
}