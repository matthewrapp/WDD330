import {
    AllLinks
} from './link.js';

import {
    myLink
} from './main.js';

import {
    saveToLocalStorage,
    getFromLocalStorage,
    setImg,
} from './utilities.js';

import firebaseApp from './firebaseApp.js';

export class Page {
    constructor(pageName) {
        this.key = pageName + ' details';
        this.links = new AllLinks('#displayLinks', pageName + ' links');
        this.pageData = {
            'pageName': pageName,
            'profileImgURL': null,
            'bgImgURL': null,
            'colorValue': null,
            'socialMedia': null,
        };
    }

    // selectProfileColor(event) {
    //     let profileColor = document.getElementById("profileColorPreview");
    //     profileColor.style.backgroundColor = event.target.value;
    //     this.colorValue = event.target.value;
    //     this.pageData.colorValue = this.colorValue;
    //     console.log(this.colorValue);

    //     saveToLocalStorage(this.key, this.pageData);
    //     console.log(this.pageData.colorValue);
    // }

    navigateToLinksPage(event) {
        let linksSection = document.getElementById('linksSection');
        let profileSection = document.getElementById('profileSection');
        linksSection.style.display = 'block';
        profileSection.style.display = 'none';
    }

    navigateToProfilePage(event) {
        let linksSection = document.getElementById('linksSection');
        let profileSection = document.getElementById('profileSection');
        profileSection.style.display = 'block';
        linksSection.style.display = 'none';
    }

    uploadProfileImg(event) {
        // variables
        let imgName, imgUrl;
        let files;
        let reader;

        firebaseApp;

        // selection process
        files = event.target.files;
        console.log(files);
        reader = new FileReader();
        console.log(reader);
        reader.onloadend = () => {
            setImg("thumbnailImgPreview", reader.result);
            imgName = files[0].name;
            imgName = imgName.substring(0, imgName.lastIndexOf('.'));
            // store to firebase
            let uploadTask = firebase.storage().ref("ProfileImages/" + imgName + '.jpg').put(files[0]);
            console.log(imgName);

            uploadTask.on("state_changed", () => {
                    // submitting image link to database
                    uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                        imgUrl = url;
                        this.pageData.profileImgURL = imgUrl;
                        firebase.database().ref("ProfileImages/" + imgName).set({
                            Name: imgName,
                            Link: imgUrl,
                        });
                        saveToLocalStorage(this.key, this.pageData);
                        // alert("image added success!");
                    })
                },
                (error) => {
                    alert("error in saving img");
                })
            console.log(this.pageData);
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    uploadBackgroundImg(event) {
        // variables
        let imgName, imgUrl;
        let files;
        let reader;

        firebaseApp;

        // selection process
        files = event.target.files;
        console.log(files);
        reader = new FileReader();
        console.log(reader);
        reader.onloadend = () => {
            console.log(imgName);
            setImg("backgroundImgPreview", reader.result);
            imgName = files[0].name;
            imgName = imgName.substring(0, imgName.lastIndexOf('.'));
            // store to firebase
            let uploadTask = firebase.storage().ref("BackgroundImages/" + imgName + '.jpg').put(files[0]);

            uploadTask.on("state_changed", () => {
                    // submitting image link to database
                    uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                        imgUrl = url;
                        this.pageData.bgImgURL = imgUrl;
                        firebase.database().ref("BackgroundImages/" + imgName).set({
                            Name: imgName,
                            Link: imgUrl,
                        });
                        saveToLocalStorage(this.key, this.pageData);
                        // alert("image added success!");
                    })
                },
                (error) => {
                    alert("error in saving img");
                })
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    loadProfileDetails() {
        this.rawPage = getFromLocalStorage(this.key);
        if (this.rawPage != null) {
            this.pageData = JSON.parse(this.rawPage);

            // load header img
            setImg("headerImgPreview", this.pageData.headerImgURL[0]);

            // load profile img
            setImg("thumbnailImgPreview", this.pageData.profileImages[0]);

            // load profile color
            // let profileColor = document.getElementById("profileColorPreview");
            // profileColor.style.backgroundColor = this.pageData.colorValue;
        }
    }

    loadProfileImage() {
        let data = getFromLocalStorage(this.key);
        this.pageData = JSON.parse(data);
        console.log(this.pageData.profileImgURL);
        setImg("thumbnailImgPreview", this.pageData.profileImgURL);
    }
    loadBackgroundImage() {
        let data = getFromLocalStorage(this.key);
        this.pageData = JSON.parse(data);
        setImg("backgroundImgPreview", this.pageData.bgImgURL);
    }


    displayLandingPage() {
        let landingPage = document.getElementById("viewContent");
        landingPage.style.display = "block";

        // create elements within the viewContent section

        // create backgroundDiv section
        let backgroundDiv = document.createElement('div');
        backgroundDiv.setAttribute('id', 'backgroundImgDiv');
        landingPage.appendChild(backgroundDiv);
        setImg("backgroundImgDiv", this.pageData.bgImgURL);

        // create body section
        let bodyDiv = document.createElement('div');
        bodyDiv.setAttribute('id', 'bodyDiv');
        landingPage.appendChild(bodyDiv);

        // load profile img
        let profileDiv = document.createElement('div');
        profileDiv.setAttribute('id', 'profileImgDiv');
        bodyDiv.appendChild(profileDiv);
        setImg("profileImgDiv", this.pageData.profileImgURL);


        // set up a div to display the links
        let linksDiv = document.createElement('div');
        linksDiv.setAttribute('id', 'linksDiv');
        this.links.links.map((link) => {
            console.log(link);
            linksDiv.innerHTML += `
            <p class="link-wrapper">
            <a class="displayed-link" href="${link.url}" style="background-color: ${link.color};" target="_blank">${link.name}</a>
            </p>`
        })
        bodyDiv.appendChild(linksDiv);

        // create footer section (for social media, etc.)
        let footerDiv = document.createElement('div');
        footerDiv.setAttribute('id', 'footerDiv');
        landingPage.appendChild(footerDiv);
        footerDiv.innerHTML = `<h4>Hello, this is footer</h4>`;
    }
}