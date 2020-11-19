import {
    qs,
    saveToLocalStorage,
    getFromLocalStorage
} from './utilities.js';

// Need to do
// Edit your links (keyup)
// add header image for landing page
// add profile image for landing page
// add social media for landing page
// Add button to display landing page
// column of buttons with hrefs behind it

class Link {
    constructor(name, url) {
        this.name = name;
        this.url = url;
        this.id = new Date();
    }
}

export class AllLinks {
    constructor(parentId, key) {
        this.parentElement = qs(parentId);
        this.key = key;
        this.removedKey = key + ' ' + 'removed';
        this.links = [];
        this.archivedLinksList = [];
    }

    addNewLink(name, url) {
        const newLink = new Link(name, url);
        this.links.push(newLink);

        let buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');

        let buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add("buttons");

        // create list item and append it to the list
        let listElement = this.parentElement;
        let listItem = document.createElement('li');
        listItem.setAttribute('id', newLink.id);

        let trashIcon = `<i class="fas fa-trash"></i>`
        let trashBtn = document.createElement('button');
        trashBtn.classList.add("trash");
        trashBtn.innerHTML = trashIcon;
        trashBtn.setAttribute("data-id", newLink.id);

        let editIcon = `<i class="far fa-edit"></i>`;
        let editBtn = document.createElement('button');
        editBtn.classList.add("edit");
        editBtn.innerHTML = editIcon;
        editBtn.setAttribute("data-id", newLink.id);

        buttonsDiv.appendChild(trashBtn);
        buttonsDiv.appendChild(editBtn);

        buttonWrapper.appendChild(buttonsDiv);

        listItem.innerHTML = `
        <p class="link-name">${name}</p>
        <a href="${url}" target="_blank">
        <p class="link-url">${url}</p>
        </a>
        ${buttonWrapper.innerHTML}`;

        listElement.appendChild(listItem);

        // save to local storage
        saveToLocalStorage(this.key, this.links);
    }

    deleteLink(id, elementToDelete) {
        let notDeletedLinksList = [];
        this.links.forEach((link) => {
            if (link.id != id) {
                notDeletedLinksList.push(link);
            } else {
                this.archivedLinksList.push(link);
            }
        })

        elementToDelete.remove();
        this.links = notDeletedLinksList;

        // reset local storage
        saveToLocalStorage(this.key, this.links);
        saveToLocalStorage(this.removedKey, this.archivedLinksList);
    }

    editLink(id, elementToEdit) {
        // get the element

        // create an input box with data-id = link.id
    }

    loadLinks() {
        let jsonList = getFromLocalStorage(this.key)
        let linkList = JSON.parse(jsonList || "[]");
        this.parentElement.childNodes.forEach((child) => {
            child.remove();
        });
        this.links = [];
        if (linkList != null) {
            linkList.forEach((link) => {
                this.links.push(link);
                // create list item and append it to the list
                let list = this.parentElement;
                let listItem = document.createElement('li');
                listItem.setAttribute('id', link.id);

                let buttonWrapper = document.createElement('div');
                buttonWrapper.classList.add('button-wrapper');

                let buttonsDiv = document.createElement('div');
                buttonsDiv.classList.add("buttons");

                let trashIcon = `<i class="fas fa-trash"></i>`
                let trashBtn = document.createElement('button');
                trashBtn.classList.add("trash");
                trashBtn.innerHTML = trashIcon;
                trashBtn.setAttribute("data-id", link.id);

                let editIcon = `<i class="far fa-edit"></i>`;
                let editBtn = document.createElement('button');
                editBtn.classList.add("edit");
                editBtn.innerHTML = editIcon;
                editBtn.setAttribute("data-id", link.id);

                buttonsDiv.appendChild(trashBtn);
                buttonsDiv.appendChild(editBtn);

                buttonWrapper.append(buttonsDiv);
                buttonWrapper.appendChild(buttonsDiv);

                listItem.innerHTML = `
                <p class="link-name">${link.name}</p>
                <a href="${link.url}" target="_blank">
                    <p class="link-url">${link.url}</p>
                </a>
                ${buttonWrapper.innerHTML}`;

                list.appendChild(listItem);
            })
        }

    }



}