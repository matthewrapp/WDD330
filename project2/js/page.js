import {
    AllLinks
} from './link.js';

import {
    saveToLocalStorage,
    getFromLocalStorage,
    setImg,
    formatUrl,
    createIcon,
    socialMediaPlaceholderConditonal
} from './utilities.js';

import firebaseApp from './firebaseApp.js';

export class Page {
    constructor(pageName) {
        this.key = pageName + ' details';
        this.links = new AllLinks('#displayLinks', pageName + ' links');
        this.pageData = {
            'pageName': pageName,
            'currentPage': 'profileSection',
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

        let linksNavItem = document.getElementById('linksNavItem');
        let profileNavItem = document.getElementById('profileNavItem');
        let socialNavItem = document.getElementById('socialMediaNavItem');

        profileNavItem.classList.remove('active');
        socialNavItem.classList.remove('active');

        if (this.pageData.currentPage == 'linksSection') {
            linksSection.style.display = 'block';
            profileSection.style.display = 'none';
            socialMediaSection.style.display = 'none';
            this.pageData.currentPage = linksSection.id;
            linksNavItem.classList.add('active');
            profileNavItem.classList.remove('active');
            socialNavItem.classList.remove('active');
        } else if (this.pageData.currentPage == 'profileSection') {
            linksSection.style.display = 'none';
            profileSection.style.display = 'block';
            socialMediaSection.style.display = 'none';
            this.pageData.currentPage = profileSection.id;
            linksNavItem.classList.remove('active');
            profileNavItem.classList.add('active');
            socialNavItem.classList.remove('active');
        } else {
            linksSection.style.display = 'none';
            profileSection.style.display = 'none';
            socialMediaSection.style.display = 'block';
            this.pageData.currentPage = socialMediaSection.id;

            linksNavItem.classList.remove('active');
            profileNavItem.classList.remove('active');
            socialNavItem.classList.add('active');

            let facebookInputBox = document.getElementById('facebookLinkInput');
            let instagramInputBox = document.getElementById('instagramLinkInput');
            let youtubeInputBox = document.getElementById('youtubeLinkInput');
            let twitterInputBox = document.getElementById('twitterLinkInput');
            let linkedinInputBox = document.getElementById('linkedinLinkInput');
            let soundcloudInputBox = document.getElementById('soundcloudLinkInput');

            if (this.pageData.socialMedia.facebook != null) {
                let trashBtn = document.getElementById('facebookTrashBtn');
                facebookInputBox.placeholder = this.pageData.socialMedia.facebook;
                trashBtn.classList.remove('hide');
            } else {
                facebookInputBox.placeholder = 'Enter Your Facebook URL';
            }
            if (this.pageData.socialMedia.instagram != null) {
                let trashBtn = document.getElementById('instagramTrashBtn');
                instagramInputBox.placeholder = this.pageData.socialMedia.instagram;
                trashBtn.classList.remove('hide');
            } else {
                instagramInputBox.placeholder = 'Enter Your Instagram URL';
            }
            if (this.pageData.socialMedia.youtube != null) {
                let trashBtn = document.getElementById('youtubeTrashBtn');
                youtubeInputBox.placeholder = this.pageData.socialMedia.youtube;
                trashBtn.classList.remove('hide');
            } else {
                youtubeInputBox.placeholder = 'Enter Your Youtube URL';
            }
            if (this.pageData.socialMedia.twitter != null) {
                let trashBtn = document.getElementById('twitterTrashBtn');
                twitterInputBox.placeholder = this.pageData.socialMedia.twitter;
                trashBtn.classList.remove('hide');
            } else {
                twitterInputBox.placeholder = 'Enter Your Twitter URL';
            }
            if (this.pageData.socialMedia.linkedin) {
                let trashBtn = document.getElementById('linkedinTrashBtn');
                linkedinInputBox.placeholder = this.pageData.socialMedia.linkedin;
                trashBtn.classList.remove('hide');
            } else {
                linkedinInputBox.placeholder = 'Enter Your LinkedIn URL';
            }
            if (this.pageData.socialMedia.soundcloud) {
                let trashBtn = document.getElementById('soundcloudTrashBtn');
                soundcloudInputBox.placeholder = this.pageData.socialMedia.soundcloud;
                trashBtn.classList.remove('hide');
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
            let trashBtn = document.getElementById('facebookTrashBtn');
            this.pageData.socialMedia.facebook = formatUrl(facebookInputBox.value.toLowerCase());
            trashBtn.classList.remove('hide');
        } else if (facebookInputBox.value != "") {
            alert('must be a Facebook proper url (Example: https://facebook.com)');
        }
        if (instagramInputBox.value != "" && instagramInputBox.value.toLowerCase().includes('instagram.com')) {
            let trashBtn = document.getElementById('instagramTrashBtn');
            this.pageData.socialMedia.instagram = formatUrl(instagramInputBox.value.toLowerCase());
            trashBtn.classList.remove('hide');
        } else if (instagramInputBox.value != "") {
            alert('must be a Instagram proper url (Example: https://instagram.com)');
        }
        if (youtubeInputBox.value != "" && youtubeInputBox.value.toLowerCase().includes('youtube.com')) {
            let trashBtn = document.getElementById('youtubeTrashBtn');
            this.pageData.socialMedia.youtube = formatUrl(youtubeInputBox.value.toLowerCase());
            trashBtn.classList.remove('hide');
        } else if (youtubeInputBox.value != "") {
            alert('must be a Youtube proper url (Example: https://youtube.com)');
        }
        if (twitterInputBox.value != "" && twitterInputBox.value.toLowerCase().includes('twitter.com')) {
            let trashBtn = document.getElementById('twitterTrashBtn');
            this.pageData.socialMedia.twitter = formatUrl(twitterInputBox.value.toLowerCase());
            trashBtn.classList.remove('hide');
        } else if (twitterInputBox.value != "") {
            alert('must be a Twitter proper url (Example: https://twitter.com)');
        }
        if (linkedinInputBox.value != "" && linkedinInputBox.value.toLowerCase().includes('linkedin.com')) {
            let trashBtn = document.getElementById('linkedinTrashBtn');
            this.pageData.socialMedia.linkedin = formatUrl(linkedinInputBox.value.toLowerCase());
            trashBtn.classList.remove('hide');
        } else if (linkedinInputBox.value != "") {
            alert('must be a LinkedIn proper url (Example: https://linkedin.com)');
        }
        if (soundcloudInputBox.value != "" && soundcloudInputBox.value.toLowerCase().includes('soundcloud.com')) {
            let trashBtn = document.getElementById('soundcloudTrashBtn');
            this.pageData.socialMedia.soundcloud = formatUrl(soundcloudInputBox.value.toLowerCase());
            trashBtn.classList.remove('hide');
        } else if (soundcloudInputBox.value != "") {
            alert('must be a Soundcloud proper url (Example: https://soundcloud.com)');
        }

        saveToLocalStorage(this.key, this.pageData);
        // facebookInputBox.value = '';
        // instagramInputBox.value = null;
        // youtubeInputBox.value = null;
        // twitterInputBox.value = null;
        // linkedinInputBox.value = null;
        // soundcloudInputBox.value = null;

        socialMediaPlaceholderConditonal(facebookInputBox, this.pageData.socialMedia.facebook, 'Facebook');
        socialMediaPlaceholderConditonal(instagramInputBox, this.pageData.socialMedia.instagram, 'Instagram');
        socialMediaPlaceholderConditonal(youtubeInputBox, this.pageData.socialMedia.youtube, 'Youtube');
        socialMediaPlaceholderConditonal(twitterInputBox, this.pageData.socialMedia.twitter, 'Twitter');
        socialMediaPlaceholderConditonal(linkedinInputBox, this.pageData.socialMedia.linkedin, 'LinkedIn');
        socialMediaPlaceholderConditonal(soundcloudInputBox, this.pageData.socialMedia.soundcloud, 'Soundcloud');
    }

    deleteSocialMediaLink(event) {
        if (event.target.parentNode.id == 'facebookLinkInputDiv') {
            let facebookInputBox = document.getElementById('facebookLinkInput');
            let facebook = this.pageData.socialMedia.facebook;
            if (facebook != null) {
                facebook = null;
                this.pageData.socialMedia.facebook = facebook;

                saveToLocalStorage(this.key, this.pageData);

                facebookInputBox.placeholder = 'Enter Your Facebook URL';
                alert('Social Link Removed.');
                let trashBtn = document.getElementById('facebookTrashBtn');
                trashBtn.classList.add('hide');
            }
        }

        if (event.target.parentNode.id == 'instagramLinkInputDiv') {
            let instagramInputBox = document.getElementById('instagramLinkInput');
            let instagram = this.pageData.socialMedia.instagram;
            if (instagram != null) {
                instagram = null;
                this.pageData.socialMedia.instagram = instagram;

                saveToLocalStorage(this.key, this.pageData);

                instagramInputBox.placeholder = 'Enter Your Instagram URL';
                alert('Social Link Removed.');
                let trashBtn = document.getElementById('instagramTrashBtn');
                trashBtn.classList.add('hide');
            }
        }

        if (event.target.parentNode.id == 'youtubeLinkInputDiv') {
            let youtubeInputBox = document.getElementById('youtubeLinkInput');
            let youtube = this.pageData.socialMedia.youtube;
            if (youtube != null) {
                youtube = null;
                this.pageData.socialMedia.youtube = youtube;

                saveToLocalStorage(this.key, this.pageData);

                youtubeInputBox.placeholder = 'Enter Your Youtube URL';
                alert('Social Link Removed.');
                let trashBtn = document.getElementById('youtubeTrashBtn');
                trashBtn.classList.add('hide');
            }
        }

        if (event.target.parentNode.id == 'twitterLinkInputDiv') {
            let twitterInputBox = document.getElementById('twitterLinkInput');
            let twitter = this.pageData.socialMedia.twitter;
            if (twitter != null) {
                twitter = null;
                this.pageData.socialMedia.twitter = twitter;

                saveToLocalStorage(this.key, this.pageData);

                twitterInputBox.placeholder = 'Enter Your Twitter URL';
                alert('Social Link Removed.');
                let trashBtn = document.getElementById('twitterTrashBtn');
                trashBtn.classList.add('hide');
            }
        }

        if (event.target.parentNode.id == 'linkedinLinkInputDiv') {
            let linkedinInputBox = document.getElementById('linkedinLinkInput');
            let linkedin = this.pageData.socialMedia.linkedin;
            if (linkedin != null) {
                linkedin = null;
                this.pageData.socialMedia.linkedin = linkedin;

                saveToLocalStorage(this.key, this.pageData);

                linkedinInputBox.placeholder = 'Enter Your LinkedIn URL';
                alert('Social Link Removed.');
                let trashBtn = document.getElementById('linkedinTrashBtn');
                trashBtn.classList.add('hide');
            }
        }

        if (event.target.parentNode.id == 'soundcloudLinkInputDiv') {
            let soundcloudInputBox = document.getElementById('soundcloudLinkInput');
            let soundcloud = this.pageData.socialMedia.soundcloud;
            if (soundcloud != null) {
                soundcloud = null;
                this.pageData.socialMedia.soundcloud = soundcloud;

                saveToLocalStorage(this.key, this.pageData);

                soundcloudInputBox.placeholder = 'Enter Your Soundcloud URL';
                alert('Social Link Removed.');
                let trashBtn = document.getElementById('soundcloudTrashBtn');
                trashBtn.classList.add('hide');
            }

        }

    }


    displayLandingPage() {
        let landingPage = document.getElementById("viewContent");
        landingPage.style.display = "block";

        // hide header elements
        let menuBtn = document.getElementById('mobileMenuBtn');
        menuBtn.style.display = 'none';

        let previewBtn = document.getElementById('previewBtn');
        previewBtn.style.display = 'none';
        let backToPanelBtn = document.getElementById('backToPanelBtn');
        backToPanelBtn.style.display = 'block';

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