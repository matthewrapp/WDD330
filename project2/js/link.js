import {
    qs,
    saveToLocalStorage,
    getFromLocalStorage,
    formatUrl
} from './utilities.js';

class Link {
    constructor(name, url, color) {
        this.name = name;
        this.url = url;
        this.color = color;
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
        buttonsDiv.setAttribute('id', 'btns');

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
        <div class="link-content-div">
        <p class="link-name">${name}</p>
        <a href="${formatUrl(url)}" target="_blank">
        <p class="link-url">${formatUrl(url)}</p>
        </a>
        ${buttonWrapper.innerHTML}
        </div>`;

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

    editLink(listElement, hyperlink) {
        // declare
        let title = listElement.querySelector('.link-name');
        title.setAttribute('contenteditable', true);
        title.focus()
        let char = title.innerText.length;
        let sel; // character at which to place caret

        if (document.selection) {
            sel = document.selection.createRange();
            sel.moveStart('character', char);
            sel.select();
        } else {
            sel = window.getSelection();
            sel.collapse(title.lastChild, char);
        }

        // create input box
        let inputBox = document.createElement('input');
        inputBox.classList.add('edit-contentable');
        inputBox.setAttribute("type", "url");
        inputBox.setAttribute("pattern", "https?://.+");
        inputBox.setAttribute("id", "linkUrl");
        inputBox.setAttribute("placeholder", hyperlink);
        // make the inputbox value == to the hyperlink
        inputBox.value = hyperlink.href;
        // now delete the hyperlink because it's turning into a inputbox
        hyperlink.remove();

        // create button to finalize the edit
        let finalizeBtn = document.createElement('button');
        finalizeBtn.setAttribute("id", "buttonFinalize");
        finalizeBtn.setAttribute("type", "button");
        finalizeBtn.innerHTML = "Save";

        // append modal to listElement
        for (let i = 0; i < listElement.children.length; i++) {
            let leChildren = listElement.children[i];
            if (leChildren.id == 'btns') {
                let divBtns = leChildren;
                divBtns.appendChild(finalizeBtn);
            }
        };
        listElement.insertBefore(inputBox, listElement.children[1]);

        // create an event listener for the finalizeBtn to save it into the original spot
        finalizeBtn.addEventListener('click', () => {
            // get the input box and store it in a varable
            let urlElement = document.getElementById('linkUrl');
            let urlValue = urlElement.value;
            let newInputValue = inputBox.value;
            urlValue = formatUrl(newInputValue);

            // create a ne hyperlink when saving it
            let newHyperlink = document.createElement('a');
            let newElement = document.createElement('p');
            newElement.classList.add('link-url');
            newElement.innerText = urlValue;
            newHyperlink.href = urlValue;
            newHyperlink.setAttribute("target", "_blank");
            newHyperlink.appendChild(newElement);

            finalizeBtn.remove();
            inputBox.remove();
            title.setAttribute('contenteditable', false);
            listElement.insertBefore(newHyperlink, listElement.children[1]);

            let idToEdit = listElement.parentElement.getAttribute("id");
            this.links.forEach((link) => {
                if (link.id == idToEdit) {
                    link.url = urlValue;
                    link.name = title.innerText;
                }
            })

            saveToLocalStorage(this.key, this.links);
            saveToLocalStorage(this.removedKey, this.archivedLinksList);
        });
    }

    loadLinks() {
        let jsonList = getFromLocalStorage(this.key);
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
                buttonsDiv.setAttribute('id', 'btns');

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
                <div class="link-content-div">
                <p class="link-name">${link.name}</p>
                <a href="${formatUrl(link.url)}" target="_blank">
                    <p class="link-url">${formatUrl(link.url)}</p>
                </a>
                ${buttonWrapper.innerHTML}
                </div>`

                list.appendChild(listItem);
            })
        }

    }
}