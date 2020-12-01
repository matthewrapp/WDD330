import {
    AllLinks
} from './link.js';

export class Page {
    constructor(pageName) {
        this.pageName = pageName;
        this.thumbnailImg = null;
        this.backgroundImg = null;
        this.key = pageName + 'details';
        this.links = new AllLinks('#displayLinks', pageName + ' links');
    }

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