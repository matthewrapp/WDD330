import {
    qs,
    saveToLocalStorage,
    getFromLocalStorage,
    formatUrl,
    getRandomColor,
    setRandomColor
} from './utilities.js';

// Need to do
// Edit your links (keyup)
// add header image for landing page
// add profile image for landing page
// add social media for landing page
// Add button to display landing page
// column of buttons with hrefs behind it

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
        const newLink = new Link(name, url, getRandomColor());
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

        setRandomColor(listItem, newLink.color);

        listItem.innerHTML = `
        <div class="show-color" style="${listItem.style.cssText};"></div>
        <div>
        <p class="link-name">${name}</p>
        <a href="${url}" target="_blank">
        <p class="link-url">${url}</p>
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
        // create div to store the new input boxes and buttons in
        let editSection = document.createElement('div');
        editSection.setAttribute("id", "editSection");

        // declare
        let title = listElement.querySelector('.link-name');
        title.setAttribute('contenteditable', true);

        // create input box
        let inputBox = document.createElement('input');
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

        // append children to modal
        editSection.appendChild(inputBox);
        editSection.appendChild(finalizeBtn);

        // append modal to listElement
        // listElement.appendChild(modal);
        console.log(listElement);
        listElement.insertBefore(editSection, listElement.children[1]);

        // create an event listener for the finalizeBtn to save it into the original spot
        // finalizeBtn.addEventListener('click', myLink.editLink);
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
            // newHyperlink.innerHTML = newElement;
            newHyperlink.appendChild(newElement);

            finalizeBtn.remove();
            inputBox.remove();
            title.setAttribute('contenteditable', false);
            listElement.insertBefore(newHyperlink, listElement.children[1]);

            let idToEdit = listElement.getAttribute("id");
            console.log(idToEdit);
            this.links.forEach((link) => {
                if (link.id == idToEdit) {
                    link.url = urlValue;
                    link.name = title.innerText;
                    // console.log(link.url);
                }
            })
            saveToLocalStorage(this.key, this.links);
            saveToLocalStorage(this.removedKey, this.archivedLinksList);
        });
    }

    // editName(listElement, title) {

    //     // // create div to store the new input boxes and buttons in
    //     // let editSection = document.createElement('div');
    //     // editSection.setAttribute("id", "editSection");

    //     // // create input box
    //     // let inputBox = document.createElement('input');
    //     // inputBox.setAttribute("type", "text");
    //     // inputBox.setAttribute("id", "linkName");
    //     // // make the inputbox value == to the original title
    //     // inputBox.value = title.innerText;
    //     // // now delete the title because it's turning into a inputbox
    //     // title.remove();

    //     // // create button to finalize the edit
    //     // let finalizeBtn = document.createElement('button');
    //     // finalizeBtn.setAttribute("id", "buttonFinalize");
    //     // finalizeBtn.setAttribute("type", "button");
    //     // finalizeBtn.innerHTML = "Save";

    //     // // append children to modal
    //     // editSection.appendChild(inputBox);
    //     // editSection.appendChild(finalizeBtn);

    //     // // append modal to listElement
    //     // // listElement.appendChild(modal);
    //     // listElement.insertBefore(editSection, listElement.children[1]);

    //     // // create an event listener for the finalizeBtn to save it into the original spot
    //     // // finalizeBtn.addEventListener('click', myLink.editLink);
    //     // finalizeBtn.addEventListener('click', () => {
    //     //     // get the input box and store it in a varable
    //     //     let titleElement = document.getElementById('linkName');
    //     //     let titleValue = titleElement.value;
    //     //     let newInputValue = inputBox.value;
    //     //     titleValue = newInputValue;

    //     //     // create a ne hyperlink when saving it
    //     //     let newElement = document.createElement('p');
    //     //     newElement.classList.add('link-name');
    //     //     newElement.innerText = titleValue;

    //     //     finalizeBtn.remove();
    //     //     inputBox.remove();
    //     //     listElement.insertBefore(newHyperlink, listElement.children[1]);

    //     //     let idToEdit = listElement.getAttribute("id");
    //     //     console.log(idToEdit);
    //     //     this.links.forEach((link) => {
    //     //         if (link.id == idToEdit) {
    //     //             link.url = urlValue;
    //     //             // console.log(link.url);
    //     //             console.log(link);
    //     //         }
    //     //     })
    //     //     saveToLocalStorage(this.key, this.links);
    //     // });

    // }

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

                setRandomColor(listItem, link.color);

                listItem.innerHTML = `
                <div class="show-color" style="${listItem.style.cssText};"></div>
                <div>
                <p class="link-name">${link.name}</p>
                <a href="${link.url}" target="_blank">
                    <p class="link-url">${link.url}</p>
                </a>
                ${buttonWrapper.innerHTML}
                </div>`

                list.appendChild(listItem);
            })
        }

    }

    // <p class="show-color" style="${listItem.style.cssText}; padding-top: 10px; padding-bottom: 10px; padding-left: 20px; color: #fff; font-size: 12px; width: 200px;"> Background Color </p>

}