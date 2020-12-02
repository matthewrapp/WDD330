import {
    AllLinks
} from './link.js';

import {
    saveToLocalStorage,
    getFromLocalStorage
} from './utilities.js';

export class Page {
    constructor(pageName) {
        this.pageName = pageName;
        this.backgroundImg = null;
        this.key = pageName + ' details';
        this.links = new AllLinks('#displayLinks', pageName + ' links');
        this.thumbnailImgArray = [];
        this.pageData = {
            'pageName': this.pageName,
            'images': this.thumbnailImgArray,
            'socialMedia': null
        };
    }

    // uploadProfileImg(event) {
    //     let imgPreview = document.getElementById("thumbnailImgPreview");
    //     console.log(event.target.files[0]);
    //     let imgSrc = URL.createObjectURL(event.target.files[0]);
    //     imgPreview.setAttribute('src', imgSrc);
    //     this.thumbnailImgArray.push(imgSrc);

    //     saveToLocalStorage(this.key, this.pageData);
    // }

    // loadProfileDetails() {
    //     this.rawPage = getFromLocalStorage(this.key);
    //     if (this.rawPage != null) {
    //         this.pageData = JSON.parse(this.rawPage);
    //         console.log(this.pageData.pageName);
    //         console.log(this.pageData.images[0]);
    //         let imgPreview = document.getElementById("thumbnailImgPreview");
    //         imgPreview.setAttribute('src', this.pageData.images[0]);
    //     }
    // }


    displayPage() {
        let landingPage = document.getElementById("viewContent");
        landingPage.style.display = "block";

        // create elements within the viewContent section
        // create header section
        let headerDiv = document.createElement('div');
        headerDiv.setAttribute('id', 'headerDiv');
        // append headerDiv to viewContent Section
        landingPage.appendChild(headerDiv);
        // layout the headerDiv
        headerDiv.innerHTML = `<h4>Hello, this is header</h4>`;

        // create body section
        let bodyDiv = document.createElement('div');
        bodyDiv.setAttribute('id', 'bodyDiv');
        // append headerDiv to viewContent Section
        landingPage.appendChild(bodyDiv);
        // layout the bodyDiv
        bodyDiv.innerHTML = `<h4>Hello, this is body</h4>`;

        // create footer section (for social media, etc.)
        let footerDiv = document.createElement('div');
        footerDiv.setAttribute('id', 'footerDiv');
        // append headerDiv to viewContent Section
        landingPage.appendChild(footerDiv);
        // layout the footerDiv
        footerDiv.innerHTML = `<h4>Hello, this is footer</h4>`;
    }
}