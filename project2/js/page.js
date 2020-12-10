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
    formatUrl,
    createIcon
} from './utilities.js';

import firebaseApp from './firebaseApp.js';

export class Page {
    constructor(pageName) {
        this.key = pageName + ' details';
        this.links = new AllLinks('#displayLinks', pageName + ' links');
        this.pageData = {
            'pageName': pageName,
            'currentPage': null,
            'profileImgURL': null,
            'bgImgURL': null,
            'colorValue': null,
            'socialMedia': {
                'facebook': null,
                'instagram': null,
                'youtube': null,
                'twitter': null,
                'linkedin': null,
                'soundcloud': null
            },
        };
        // load local storage info
        let data = getFromLocalStorage(this.key);
        if (data != null) {
            this.pageData = JSON.parse(data);
        }
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

    setPageName() {
        let nameInputBox = document.getElementById('inputProfileName');
        let nameInputValue = nameInputBox.value;
        this.pageData.pageName = nameInputValue;

        let userName = document.getElementById('userName');
        userName.innerText = this.pageData.pageName;

        saveToLocalStorage(this.key, this.pageData);
    }

    loadPageName() {
        let userName = document.getElementById('userName');
        userName.innerText = this.pageData.pageName;
    }

    navigateToLinksPage(event) {
        let mobileMenu = document.getElementById('sidebar');
        mobileMenu.classList.toggle('shownavigation');

        let linksNavItem = document.getElementById('linksNavItem');
        let profileNavItem = document.getElementById('profileNavItem');
        let socialNavItem = document.getElementById('socialMediaNavItem');
        linksNavItem.classList.add('active');
        profileNavItem.classList.remove('active');
        socialNavItem.classList.remove('active');

        let linksSection = document.getElementById('linksSection');
        let profileSection = document.getElementById('profileSection');
        let socialMediaSection = document.getElementById('socialMediaSection');
        linksSection.style.display = 'block';
        profileSection.style.display = 'none';
        socialMediaSection.style.display = 'none';
        this.pageData.currentPage = linksSection.id;

        saveToLocalStorage(this.key, this.pageData);
    }

    navigateToProfilePage(event) {
        let mobileMenu = document.getElementById('sidebar');
        mobileMenu.classList.toggle('shownavigation');

        let linksNavItem = document.getElementById('linksNavItem');
        let profileNavItem = document.getElementById('profileNavItem');
        let socialNavItem = document.getElementById('socialMediaNavItem');
        profileNavItem.classList.add('active');
        linksNavItem.classList.remove('active');
        socialNavItem.classList.remove('active');

        let linksSection = document.getElementById('linksSection');
        let profileSection = document.getElementById('profileSection');
        let socialMediaSection = document.getElementById('socialMediaSection');
        let nameInputBox = document.getElementById('inputProfileName');
        profileSection.style.display = 'block';
        socialMediaSection.style.display = 'none';
        linksSection.style.display = 'none';
        nameInputBox.placeholder = this.pageData.pageName;
        this.pageData.currentPage = profileSection.id;

        saveToLocalStorage(this.key, this.pageData);
    }

    navigateToSocialMediaPage(event) {
        let mobileMenu = document.getElementById('sidebar');
        mobileMenu.classList.toggle('shownavigation');

        let linksNavItem = document.getElementById('linksNavItem');
        let profileNavItem = document.getElementById('profileNavItem');
        let socialNavItem = document.getElementById('socialMediaNavItem');
        socialNavItem.classList.add('active');
        linksNavItem.classList.remove('active');
        profileNavItem.classList.remove('active');

        let linksSection = document.getElementById('linksSection');
        let profileSection = document.getElementById('profileSection');
        let socialMediaSection = document.getElementById('socialMediaSection');
        socialMediaSection.style.display = 'block';
        linksSection.style.display = 'none';
        profileSection.style.display = 'none';
        this.pageData.currentPage = socialMediaSection.id;

        saveToLocalStorage(this.key, this.pageData);
    }

    loadCurrentPage(event) {
        let linksSection = document.getElementById('linksSection');
        let profileSection = document.getElementById('profileSection');
        let socialMediaSection = document.getElementById('socialMediaSection');

        if (this.pageData.currentPage == 'linksSection') {
            linksSection.style.display = 'block';
            profileSection.style.display = 'none';
            socialMediaSection.style.display = 'none';
            this.pageData.currentPage = linksSection.id;
        } else if (this.pageData.currentPage == 'profileSection') {
            linksSection.style.display = 'none';
            profileSection.style.display = 'block';
            socialMediaSection.style.display = 'none';
            this.pageData.currentPage = profileSection.id;
        } else {
            linksSection.style.display = 'none';
            profileSection.style.display = 'none';
            socialMediaSection.style.display = 'block';
            this.pageData.currentPage = socialMediaSection.id;

            let facebookInputBox = document.getElementById('facebookLinkInput');
            let instagramInputBox = document.getElementById('instagramLinkInput');
            let youtubeInputBox = document.getElementById('youtubeLinkInput');
            let twitterInputBox = document.getElementById('twitterLinkInput');
            let linkedinInputBox = document.getElementById('linkedinLinkInput');
            let soundcloudInputBox = document.getElementById('soundcloudLinkInput');

            if (this.pageData.socialMedia.facebook != null) {
                facebookInputBox.placeholder = this.pageData.socialMedia.facebook;
            } else {
                facebookInputBox.placeholder = 'Enter Your Facebook URL';
            }
            if (this.pageData.socialMedia.instagram != null) {
                instagramInputBox.placeholder = this.pageData.socialMedia.instagram;
            } else {
                instagramInputBox.placeholder = 'Enter Your Instagram URL';
            }
            if (this.pageData.socialMedia.youtube != null) {
                youtubeInputBox.placeholder = this.pageData.socialMedia.youtube;
            } else {
                youtubeInputBox.placeholder = 'Enter Your Youtube URL';
            }
            if (this.pageData.socialMedia.twitter != null) {
                twitterInputBox.placeholder = this.pageData.socialMedia.twitter;
            } else {
                twitterInputBox.placeholder = 'Enter Your Twitter URL';
            }
            if (this.pageData.socialMedia.linkedin) {
                linkedinInputBox.placeholder = this.pageData.socialMedia.linkedin;
            } else {
                linkedinInputBox.placeholder = 'Enter Your LinkedIn URL';
            }
            if (this.pageData.socialMedia.soundcloud) {
                soundcloudInputBox.placeholder = this.pageData.socialMedia.soundcloud;
            } else {
                soundcloudInputBox.placeholder = 'Enter Your Soundcloud URL';
            }
        }
    }

    uploadImg(event, elementId, imgFolder, isProfileImg) {
        // variables
        let imgName;
        let files;
        let reader;

        firebaseApp;

        // selection process
        files = event.target.files;
        reader = new FileReader();
        reader.onloadend = () => {
            setImg(elementId, reader.result);
            imgName = files[0].name;
            imgName = imgName.substring(0, imgName.lastIndexOf('.'));
            // store to firebase
            let uploadTask = firebase.storage().ref(imgFolder + "/" + imgName).put(files[0]);

            uploadTask.on("state_changed", () => {
                // what's going on when it changes
            }, (error) => {
                // what happens when it breaks
                alert("error in saving img");
            }, () => {
                // what happens when it's done
                let thisPage = this;
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log(thisPage.pageData);
                    console.log('File available at', downloadURL);
                    if (isProfileImg) {
                        thisPage.pageData.profileImgURL = downloadURL;
                    } else {
                        thisPage.pageData.bgImgURL = downloadURL;
                    }
                    firebase.database().ref(imgFolder + "/" + imgName).set({
                        Name: imgName,
                        Link: downloadURL,
                    });
                    saveToLocalStorage(thisPage.key, thisPage.pageData);
                });
            })
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    loadProfileImage() {
        if (this.pageData.profileImgURL != null) {
            setImg("thumbnailImgPreview", this.pageData.profileImgURL);
        }
    }

    loadBackgroundImage() {
        if (this.pageData.bgImgURL != null) {
            setImg("backgroundImgPreview", this.pageData.bgImgURL);
        }
    }

    setSocialMediaLinks() {
        let facebookInputBox = document.getElementById('facebookLinkInput');
        let instagramInputBox = document.getElementById('instagramLinkInput');
        let youtubeInputBox = document.getElementById('youtubeLinkInput');
        let twitterInputBox = document.getElementById('twitterLinkInput');
        let linkedinInputBox = document.getElementById('linkedinLinkInput');
        let soundcloudInputBox = document.getElementById('soundcloudLinkInput');

        if (facebookInputBox.value != "" && facebookInputBox.value.toLowerCase().includes('facebook.com')) {
            this.pageData.socialMedia.facebook = formatUrl(facebookInputBox.value.toLowerCase());
        } else if (facebookInputBox.value != "") {
            alert('must be a Facebook proper url (Example: https://facebook.com)');
        }
        if (instagramInputBox.value != "" && instagramInputBox.value.toLowerCase().includes('instagram.com')) {
            this.pageData.socialMedia.instagram = formatUrl(instagramInputBox.value.toLowerCase());
        } else if (instagramInputBox.value != "") {
            alert('must be a Instagram proper url (Example: https://instagram.com)');
        }
        if (youtubeInputBox.value != "" && youtubeInputBox.value.toLowerCase().includes('youtube.com')) {
            this.pageData.socialMedia.youtube = formatUrl(youtubeInputBox.value.toLowerCase());
        } else if (youtubeInputBox.value != "") {
            alert('must be a Youtube proper url (Example: https://youtube.com)');
        }
        if (twitterInputBox.value != "" && twitterInputBox.value.toLowerCase().includes('twitter.com')) {
            this.pageData.socialMedia.twitter = formatUrl(twitterInputBox.value.toLowerCase());
        } else if (twitterInputBox.value != "") {
            alert('must be a Twitter proper url (Example: https://twitter.com)');
        }
        if (linkedinInputBox.value != "" && linkedinInputBox.value.toLowerCase().includes('linkedin.com')) {
            this.pageData.socialMedia.linkedin = formatUrl(linkedinInputBox.value.toLowerCase());
        } else if (linkedinInputBox.value != "") {
            alert('must be a LinkedIn proper url (Example: https://linkedin.com)');
        }
        if (soundcloudInputBox.value != "" && soundcloudInputBox.value.toLowerCase().includes('soundcloud.com')) {
            this.pageData.socialMedia.soundcloud = formatUrl(soundcloudInputBox.value.toLowerCase());
        } else if (soundcloudInputBox.value != "") {
            alert('must be a Soundcloud proper url (Example: https://soundcloud.com)');
        }

        saveToLocalStorage(this.key, this.pageData);
        facebookInputBox.value = null;
        instagramInputBox.value = null;
        youtubeInputBox.value = null;
        twitterInputBox.value = null;
        linkedinInputBox.value = null;
        soundcloudInputBox.value = null;

        facebookInputBox.placeholder = this.pageData.socialMedia.facebook;
        instagramInputBox.placeholder = this.pageData.socialMedia.instagram;
        youtubeInputBox.placeholder = this.pageData.socialMedia.youtube;
        twitterInputBox.placeholder = this.pageData.socialMedia.twitter;
        linkedinInputBox.placeholder = this.pageData.socialMedia.linkedin;
        soundcloudInputBox.placeholder = this.pageData.socialMedia.soundcloud;
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

        // create overlay div
        let overlayDiv = document.createElement('div');
        overlayDiv.setAttribute('id', 'backgroundOverlayDiv');
        backgroundDiv.appendChild(overlayDiv);

        // create body section
        let bodyDiv = document.createElement('div');
        bodyDiv.setAttribute('id', 'bodyDiv');
        landingPage.appendChild(bodyDiv);

        // load profile img
        let profileDiv = document.createElement('div');
        profileDiv.setAttribute('id', 'profileImgDiv');
        profileDiv.classList.add('profile-image-div');
        bodyDiv.appendChild(profileDiv);
        setImg("profileImgDiv", this.pageData.profileImgURL);

        // load profile name
        let profileNameDiv = document.createElement('div');
        profileNameDiv.setAttribute('id', 'profileNameDiv');
        bodyDiv.appendChild(profileNameDiv);
        profileNameDiv.innerHTML = `<h4 class="username-heading">${this.pageData.pageName}</h4>`;


        // set up a div to display the links
        let linksDiv = document.createElement('div');
        linksDiv.setAttribute('id', 'linksDiv');
        this.links.links.map((link) => {
            console.log(link);
            linksDiv.innerHTML += `
            <p class="link-wrapper">
            <a class="displayed-link" href="${link.url}" style="background-color:#fff;" target="_blank">${link.name}</a>
            </p>`
        })
        bodyDiv.appendChild(linksDiv);

        // create footer section (for social media, etc.)
        let footerDiv = document.createElement('div');
        footerDiv.setAttribute('id', 'footerDiv');
        landingPage.appendChild(footerDiv);

        let socialMediaDisplayDiv = document.createElement('div');
        socialMediaDisplayDiv.setAttribute('id', 'socialMediaDisplayDiv');

        if (this.pageData.socialMedia.facebook != null) {
            createIcon('fab fa-facebook-square', this.pageData.socialMedia.facebook, socialMediaDisplayDiv);
        }
        if (this.pageData.socialMedia.instagram != null) {
            createIcon('fab fa-instagram-square', this.pageData.socialMedia.instagram, socialMediaDisplayDiv);
        }
        if (this.pageData.socialMedia.youtube != null) {
            createIcon('fab fa-youtube-square', this.pageData.socialMedia.youtube, socialMediaDisplayDiv);
        }
        if (this.pageData.socialMedia.twitter != null) {
            createIcon('fab fa-twitter-square', this.pageData.socialMedia.twitter, socialMediaDisplayDiv);
        }
        if (this.pageData.socialMedia.linkedin != null) {
            createIcon('fab fa-linkedin', this.pageData.socialMedia.linkedin, socialMediaDisplayDiv);
        }
        if (this.pageData.socialMedia.soundcloud != null) {
            createIcon('fab fa-soundcloud', this.pageData.socialMedia.soundcloud, socialMediaDisplayDiv);
        }

        footerDiv.appendChild(socialMediaDisplayDiv);
    }
}