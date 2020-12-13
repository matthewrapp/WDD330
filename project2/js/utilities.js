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
    let httpString = "http://";
    let httpsString = "https://";
    let com = '.com';
    if (url.substr(0, httpString.length).toLowerCase() !== httpString && url.substr(0, httpsString.length).toLowerCase() !== httpsString) {
        if (!url.includes('.com')) {
            url = httpsString + url + com;
        } else {
            url = httpsString + url;
        }
    }
    return url;
}

// display/hide sections
export function display(idToDisplay, idToHideOne, idToHideTwo) {
    let show = document.getElementById(idToDisplay);
    let hideOne = document.getElementById(idToHideOne);
    let hideTwo = document.getElementById(idToHideTwo);

    show.style.display = 'block';
    hideOne.style.display = 'none';
    hideTwo.style.display = 'none';

    // save the current page
    myLink.pageData.currentPage = idToDisplay;
}

export function activeTab(addActive, removeActiveOne, removeActiveTwo) {
    let addActiveClass = document.getElementById(addActive);
    let removeActiveClassOne = document.getElementById(removeActiveOne);
    let removeActiveClassTwo = document.getElementById(removeActiveTwo);
    addActiveClass.classList.add('active');
    removeActiveClassOne.classList.remove('active');
    removeActiveClassTwo.classList.remove('active');
}

// set the placeholder after adding social media depending on if there was a link inputted or not
export function socialMediaPlaceholderConditonal(inputBox, socialMediaValue, socialMediaPlatform) {
    if (inputBox.value != "") {
        inputBox.value = '';
        inputBox.placeholder = socialMediaValue;
    } else if (socialMediaValue != null) {
        inputBox.placeholder = socialMediaValue;
    } else {
        inputBox.value = '';
        inputBox.placeholder = `Enter Your ${socialMediaPlatform} URL`;
    }
}

// set img helper function
export function setImg(id, img) {
    let element = document.getElementById(id);
    element.style.backgroundImage = `url('${img}')`;
    element.style.backgroundSize = 'cover';
    element.style.backgroundRepeat = 'no-repeat';
}

// create icon
export function createIcon(iconClass, linkHref, div) {
    // create icon
    let icon = document.createElement('i');
    icon.setAttribute('class', iconClass);
    // create href/link
    let showIcon = document.createElement('a');
    showIcon.setAttribute('href', linkHref);
    showIcon.setAttribute('target', '_blank');
    // append icon into the link
    showIcon.appendChild(icon);
    // append link into the social media div
    div.appendChild(showIcon);
}

// export function createRange(node, chars, range) {
//     if (!range) {
//         range = document.createRange()
//         range.selectNode(node);
//         range.setStart(node, 0);
//     }

//     if (chars.count === 0) {
//         range.setEnd(node, chars.count);
//     } else if (node && chars.count > 0) {
//         if (node.nodeType === Node.TEXT_NODE) {
//             if (node.textContent.length < chars.count) {
//                 chars.count -= node.textContent.length;
//             } else {
//                 range.setEnd(node, chars.count);
//                 chars.count = 0;
//             }
//         } else {
//             for (var lp = 0; lp < node.childNodes.length; lp++) {
//                 range = createRange(node.childNodes[lp], chars, range);

//                 if (chars.count === 0) {
//                     break;
//                 }
//             }
//         }
//     }

//     return range;
// };




// helper function
// target differeent elements
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
        adminSection.style.display = "none";
        sidebarSection.style.display = "none";

        myLink.displayLandingPage();
    }

    if (event.target.id == "backToPanelBtn") {
        window.location.reload();
    }

    // upload profile img
    if (event.target.id == "thumbnailImgUpload" && event.target.files.length > 0) {
        myLink.uploadImg(event, "thumbnailImgPreview", "ProfileImages", true);
    }

    // upload background img
    if (event.target.id == "backgroundImgUpload" && event.target.files.length > 0) {
        myLink.uploadImg(event, "backgroundImgPreview", "BackgroundImages", false);
    }

    if (event.target.id == "facebookTrashBtn") {
        myLink.deleteSocialMediaLink(event);
    }
    if (event.target.id == "instagramTrashBtn") {
        myLink.deleteSocialMediaLink(event);
    }
    if (event.target.id == "youtubeTrashBtn") {
        myLink.deleteSocialMediaLink(event);
    }
    if (event.target.id == "twitterTrashBtn") {
        myLink.deleteSocialMediaLink(event);
    }
    if (event.target.id == "linkedinTrashBtn") {
        myLink.deleteSocialMediaLink(event);
    }
    if (event.target.id == "soundcloudTrashBtn") {
        myLink.deleteSocialMediaLink(event);
    }

    if (event.target.id == "linksNavItem") {
        myLink.navigateToLinksPage();
    }

    if (event.target.id == "profileNavItem") {
        myLink.navigateToProfilePage();
    }

    if (event.target.id == "socialMediaNavItem") {
        myLink.navigateToSocialMediaPage();
    }

    if (event.target.id == "buttonAddProfileName") {
        myLink.setPageName();
    }

    if (event.target.id == "addSocialMediaBtn") {
        myLink.setSocialMediaLinks();
    }
}

export function onchangeAction(event) {
    if (event.target.id == "inputColor") {
        myLink.selectProfileColor(event);
    }


}