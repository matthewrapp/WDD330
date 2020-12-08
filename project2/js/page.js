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
            'profileImages': [],
            'headerImages': [],
            'colorValue': null,
            'socialMedia': null,
        };
    }

    selectProfileColor(event) {
        let profileColor = document.getElementById("profileColorPreview");
        profileColor.style.backgroundColor = event.target.value;
        this.colorValue = event.target.value;
        this.pageData.colorValue = this.colorValue;
        console.log(this.colorValue);

        saveToLocalStorage(this.key, this.pageData);
        console.log(this.pageData.colorValue);

    }

    // async uploadProfileImg(event) {
    //     let imgProfileImgPreview = document.getElementById("thumbnailImgPreview");
    //     let imgProfileSrc = event.target.files[0];

    //     // alert if image is too big
    //     if (imgProfileSrc.size > 4096) {
    //         alert('file size too big');
    //         document.getElementById("thumbnailImgUpload").value = '';
    //         return;
    //     }

    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //         // convert file to base64 String
    //         const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
    //         // store file
    //         this.pageData.profileImages.splice(0, 1, base64String);
    //         saveToLocalStorage(this.key, this.pageData);
    //         // display image
    //         imgProfileImgPreview.style.background = `url(data:image/png;base64,${base64String})`;
    //         imgProfileImgPreview.style.backgroundSize = 'cover';
    //         imgProfileImgPreview.style.backgroundRepeat = 'no-repeat';
    //     };
    //     reader.readAsDataURL(imgProfileSrc);
    // }

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

    // async uploadHeaderImg(event) {
    //     let imgPreview = document.getElementById("headerImgPreview");
    //     let imgSrc = event.target.files[0];

    //     // alert if image is too big
    //     if (imgPreview.size > 4096) {
    //         alert('file size too big');
    //         document.getElementById("thumbnailImgUpload").value = '';
    //         return;
    //     }

    //     const reader = new FileReader();

    //     console.log(imgSrc.type);

    //     reader.onloadend = () => {
    //         // convert file to base64 String
    //         const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
    //         // store file
    //         this.pageData.headerImages.splice(0, 1, base64String);
    //         saveToLocalStorage(this.key, this.pageData);
    //         // display image
    //         imgPreview.style.background = `url(data:image/png;base64,${base64String})`;
    //         imgPreview.style.backgroundSize = 'cover';
    //         imgPreview.style.backgroundRepeat = 'no-repeat';
    //     };
    //     reader.readAsDataURL(imgSrc);
    // }

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

    // loadProfileDetails() {
    //     this.rawPage = getFromLocalStorage(this.key);
    //     if (this.rawPage != null) {
    //         this.pageData = JSON.parse(this.rawPage);

    //         // load header img
    //         setImg("headerImgPreview", this.pageData.headerImages[0]);

    //         // load profile img
    //         setImg("thumbnailImgPreview", this.pageData.profileImages[0]);

    //         // load profile color
    //         // let profileColor = document.getElementById("profileColorPreview");
    //         // profileColor.style.backgroundColor = this.pageData.colorValue;
    //     }
    // }

    loadProfileImage() {
        let data = getFromLocalStorage(this.key);
        this.pageData = JSON.parse(data);
        setImg("thumbnailImgPreview", this.pageData.profileImgURL);
    }
    loadBackgroundImage() {
        let data = getFromLocalStorage(this.key);
        this.pageData = JSON.parse(data);
        setImg("backgroundImgPreview", this.pageData.bgImgURL);
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

        // load header img
        let headerImg = document.getElementById("headerImgPreview");
        setImg("headerImgPreview", this.pageData.headerImages[0]);
        //layout the header
        headerDiv.appendChild(headerImg);

        // create body section
        let bodyDiv = document.createElement('div');
        bodyDiv.setAttribute('id', 'bodyDiv');
        // append headerDiv to viewContent Section
        landingPage.appendChild(bodyDiv);


        // load profile img
        let profileImg = document.getElementById("thumbnailImgPreview");
        setImg("thumbnailImgPreview", this.pageData.profileImages[0]);
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
        // linksDiv.innerText(this.links.loadLinks());
        // layout the bodyDiv
        bodyDiv.appendChild(profileImg);
        bodyDiv.appendChild(linksDiv);

        // create footer section (for social media, etc.)
        let footerDiv = document.createElement('div');
        footerDiv.setAttribute('id', 'footerDiv');
        // append headerDiv to viewContent Section
        landingPage.appendChild(footerDiv);
        // layout the footerDiv
        footerDiv.innerHTML = `<h4>Hello, this is footer</h4>`;
    }
}