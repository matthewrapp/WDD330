import {
    qs,
    saveToLocalStorage,
    getFromLocalStorage
} from './utilities.js';

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
        this.links = [];
        this.archivedLinksList = [];
    }

    addNewLink(name, url) {
        const newLink = new Link(name, url);
        this.links.push(newLink);

        // create list item and append it to the list
        let listElement = this.parentElement;
        let listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${url}" target="_blank">${name}</a>`;
        listElement.appendChild(listItem);

        // save to local storage
        saveToLocalStorage(this.key, this.links);
        console.log(this.links);
    }

    deleteLink(id, elementToDelete) {
        let notDeletedLinksList = [];
        this.links.forEach(link => {
            if (link.id != id) {
                notDeletedLinksList.push(link);
            } else {
                this.archivedLinksList.push(link);
            }
        })

        elementToDelete.remove();
        this.links = notDeletedLinksList;

        // reset local storage
        saveTodos(this.key, this.links);
        saveTodos(this.key, this.archivedLinksList);
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
                listItem.innerHTML = `<a href="${link.url}" target="_blank">${link.name}</a>`;
                list.appendChild(listItem);
            })
        }

    }



}