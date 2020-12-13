import {
    AllLinks
} from './link.js';

import {
    saveToLocalStorage,
    getFromLocalStorage,
    setImg,
    formatUrl,
    createIcon,
    socialMediaPlaceholderConditonal,
    display,
    activeTab
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

        // set global data members
        // social media input boxes
        this.facebookInputBox = document.getElementById('facebookLinkInput');
        this.instagramInputBox = document.getElementById('instagramLinkInput');
        this.youtubeInputBox = document.getElementById('youtubeLinkInput');
        this.twitterInputBox = document.getElementById('twitterLinkInput');
        this.linkedinInputBox = document.getElementById('linkedinLinkInput');
        this.soundcloudInputBox = document.getElementById('soundcloudLinkInput');

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

        activeTab('linksNavItem', 'profileNavItem', 'socialMediaNavItem');

        display('linksSection', 'socialMediaSection', 'profileSection');

        saveToLocalStorage(this.key, this.pageData);
    }

    navigateToProfilePage(event) {
        let mobileMenu = document.getElementById('sidebar');
        mobileMenu.classList.toggle('shownavigation');

        activeTab('profileNavItem', 'linksNavItem', 'socialMediaNavItem');

        // let nameInputBox = document.getElementById('inputProfileName');
        // nameInputBox.placeholder = this.pageData.pageName;

        display('profileSection', 'socialMediaSection', 'linksSection');

        saveToLocalStorage(this.key, this.pageData);
    }

    navigateToSocialMediaPage(event) {
        let mobileMenu = document.getElementById('sidebar');
        mobileMenu.classList.toggle('shownavigation');

        activeTab('socialMediaNavItem', 'linksNavItem', 'profileNavItem');

        // display socialMediaSection, hide profileSection & linksSection
        display('socialMediaSection', 'profileSection', 'linksSection');

        if (this.pageData.socialMedia.facebook != null) {
            let trashBtn = document.getElementById('facebookTrashBtn');
            this.facebookInputBox.placeholder = this.pageData.socialMedia.facebook;
            trashBtn.classList.remove('hide');
        } else {
            this.facebookInputBox.placeholder = 'Enter Your Facebook URL';
        }
        if (this.pageData.socialMedia.instagram != null) {
            let trashBtn = document.getElementById('instagramTrashBtn');
            this.instagramInputBox.placeholder = this.pageData.socialMedia.instagram;
            trashBtn.classList.remove('hide');
        } else {
            this.instagramInputBox.placeholder = 'Enter Your Instagram URL';
        }
        if (this.pageData.socialMedia.youtube != null) {
            let trashBtn = document.getElementById('youtubeTrashBtn');
            this.youtubeInputBox.placeholder = this.pageData.socialMedia.youtube;
            trashBtn.classList.remove('hide');
        } else {
            this.youtubeInputBox.placeholder = 'Enter Your Youtube URL';
        }
        if (this.pageData.socialMedia.twitter != null) {
            let trashBtn = document.getElementById('twitterTrashBtn');
            this.twitterInputBox.placeholder = this.pageData.socialMedia.twitter;
            trashBtn.classList.remove('hide');
        } else {
            this.twitterInputBox.placeholder = 'Enter Your Twitter URL';
        }
        if (this.pageData.socialMedia.linkedin) {
            let trashBtn = document.getElementById('linkedinTrashBtn');
            this.linkedinInputBox.placeholder = this.pageData.socialMedia.linkedin;
            trashBtn.classList.remove('hide');
        } else {
            this.linkedinInputBox.placeholder = 'Enter Your LinkedIn URL';
        }
        if (this.pageData.socialMedia.soundcloud) {
            let trashBtn = document.getElementById('soundcloudTrashBtn');
            this.soundcloudInputBox.placeholder = this.pageData.socialMedia.soundcloud;
            trashBtn.classList.remove('hide');
        } else {
            this.soundcloudInputBox.placeholder = 'Enter Your Soundcloud URL';
        }



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
            display('linksSection', 'profileSection', 'socialMediaSection');
            activeTab('linksNavItem', 'profileNavItem', 'socialMediaNavItem');
        } else if (this.pageData.currentPage == 'profileSection') {
            display('profileSection', 'linksSection', 'socialMediaSection');
            activeTab('profileNavItem', 'linksNavItem', 'socialMediaNavItem');
        } else {
            display('socialMediaSection', 'linksSection', 'profileSection');
            activeTab('socialMediaNavItem', 'linksNavItem', 'profileNavItem');

            if (this.pageData.socialMedia.facebook != null) {
                let trashBtn = document.getElementById('facebookTrashBtn');
                this.facebookInputBox.placeholder = this.pageData.socialMedia.facebook;
                trashBtn.classList.remove('hide');
            } else {
                this.facebookInputBox.placeholder = 'Enter Your Facebook URL';
            }
            if (this.pageData.socialMedia.instagram != null) {
                let trashBtn = document.getElementById('instagramTrashBtn');
                this.instagramInputBox.placeholder = this.pageData.socialMedia.instagram;
                trashBtn.classList.remove('hide');
            } else {
                this.instagramInputBox.placeholder = 'Enter Your Instagram URL';
            }
            if (this.pageData.socialMedia.youtube != null) {
                let trashBtn = document.getElementById('youtubeTrashBtn');
                this.youtubeInputBox.placeholder = this.pageData.socialMedia.youtube;
                trashBtn.classList.remove('hide');
            } else {
                this.youtubeInputBox.placeholder = 'Enter Your Youtube URL';
            }
            if (this.pageData.socialMedia.twitter != null) {
                let trashBtn = document.getElementById('twitterTrashBtn');
                this.twitterInputBox.placeholder = this.pageData.socialMedia.twitter;
                trashBtn.classList.remove('hide');
            } else {
                this.twitterInputBox.placeholder = 'Enter Your Twitter URL';
            }
            if (this.pageData.socialMedia.linkedin) {
                let trashBtn = document.getElementById('linkedinTrashBtn');
                this.linkedinInputBox.placeholder = this.pageData.socialMedia.linkedin;
                trashBtn.classList.remove('hide');
            } else {
                this.linkedinInputBox.placeholder = 'Enter Your LinkedIn URL';
            }
            if (this.pageData.socialMedia.soundcloud) {
                let trashBtn = document.getElementById('soundcloudTrashBtn');
                this.soundcloudInputBox.placeholder = this.pageData.socialMedia.soundcloud;
                trashBtn.classList.remove('hide');
            } else {
                this.soundcloudInputBox.placeholder = 'Enter Your Soundcloud URL';
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

        if (this.facebookInputBox.value != "" && this.facebookInputBox.value.toLowerCase().includes('facebook.com')) {
            let trashBtn = document.getElementById('facebookTrashBtn');
            this.pageData.socialMedia.facebook = formatUrl(this.facebookInputBox.value.toLowerCase());
            trashBtn.classList.remove('hide');
        } else if (this.facebookInputBox.value != "") {
            alert('must be a Facebook proper url (Example: https://facebook.com)');
            this.facebookInputBox.value = '';
        }
        if (this.instagramInputBox.value != "" && this.instagramInputBox.value.toLowerCase().includes('instagram.com')) {
            let trashBtn = document.getElementById('instagramTrashBtn');
            this.pageData.socialMedia.instagram = formatUrl(this.instagramInputBox.value.toLowerCase());
            trashBtn.classList.remove('hide');
        } else if (this.instagramInputBox.value != "") {
            alert('must be a Instagram proper url (Example: https://instagram.com)');
            this.instagramInputBox.value = '';
        }
        if (this.youtubeInputBox.value != "" && this.youtubeInputBox.value.toLowerCase().includes('youtube.com')) {
            let trashBtn = document.getElementById('youtubeTrashBtn');
            this.pageData.socialMedia.youtube = formatUrl(this.youtubeInputBox.value.toLowerCase());
            trashBtn.classList.remove('hide');
        } else if (this.youtubeInputBox.value != "") {
            alert('must be a Youtube proper url (Example: https://youtube.com)');
            this.youtubeInputBox.value = '';
        }
        if (this.twitterInputBox.value != "" && this.twitterInputBox.value.toLowerCase().includes('twitter.com')) {
            let trashBtn = document.getElementById('twitterTrashBtn');
            this.pageData.socialMedia.twitter = formatUrl(this.twitterInputBox.value.toLowerCase());
            trashBtn.classList.remove('hide');
        } else if (this.twitterInputBox.value != "") {
            alert('must be a Twitter proper url (Example: https://twitter.com)');
            this.twitterInputBox.value = '';
        }
        if (this.linkedinInputBox.value != "" && this.linkedinInputBox.value.toLowerCase().includes('linkedin.com')) {
            let trashBtn = document.getElementById('linkedinTrashBtn');
            this.pageData.socialMedia.linkedin = formatUrl(this.linkedinInputBox.value.toLowerCase());
            trashBtn.classList.remove('hide');
        } else if (this.linkedinInputBox.value != "") {
            alert('must be a LinkedIn proper url (Example: https://linkedin.com)');
            this.linkedinInputBox.value = '';
        }
        if (this.soundcloudInputBox.value != "" && this.soundcloudInputBox.value.toLowerCase().includes('soundcloud.com')) {
            let trashBtn = document.getElementById('soundcloudTrashBtn');
            this.pageData.socialMedia.soundcloud = formatUrl(this.soundcloudInputBox.value.toLowerCase());
            trashBtn.classList.remove('hide');
        } else if (this.soundcloudInputBox.value != "") {
            alert('must be a Soundcloud proper url (Example: https://soundcloud.com)');
            this.soundcloudInputBox.value = '';
        }

        saveToLocalStorage(this.key, this.pageData);

        socialMediaPlaceholderConditonal(this.facebookInputBox, this.pageData.socialMedia.facebook, 'Facebook');
        socialMediaPlaceholderConditonal(this.instagramInputBox, this.pageData.socialMedia.instagram, 'Instagram');
        socialMediaPlaceholderConditonal(this.youtubeInputBox, this.pageData.socialMedia.youtube, 'Youtube');
        socialMediaPlaceholderConditonal(this.twitterInputBox, this.pageData.socialMedia.twitter, 'Twitter');
        socialMediaPlaceholderConditonal(this.linkedinInputBox, this.pageData.socialMedia.linkedin, 'LinkedIn');
        socialMediaPlaceholderConditonal(this.soundcloudInputBox, this.pageData.socialMedia.soundcloud, 'Soundcloud');
    }

    deleteSocialMediaLink(event) {
        if (event.target.parentNode.id == 'facebookLinkInputDiv') {
            let facebook = this.pageData.socialMedia.facebook;
            if (facebook != null) {
                facebook = null;
                this.pageData.socialMedia.facebook = facebook;

                saveToLocalStorage(this.key, this.pageData);

                this.facebookInputBox.placeholder = 'Enter Your Facebook URL';
                alert('Social Link Removed.');
                let trashBtn = document.getElementById('facebookTrashBtn');
                trashBtn.classList.add('hide');
            }
        }

        if (event.target.parentNode.id == 'instagramLinkInputDiv') {
            let instagram = this.pageData.socialMedia.instagram;
            if (instagram != null) {
                instagram = null;
                this.pageData.socialMedia.instagram = instagram;

                saveToLocalStorage(this.key, this.pageData);

                this.instagramInputBox.placeholder = 'Enter Your Instagram URL';
                alert('Social Link Removed.');
                let trashBtn = document.getElementById('instagramTrashBtn');
                trashBtn.classList.add('hide');
            }
        }

        if (event.target.parentNode.id == 'youtubeLinkInputDiv') {
            let youtube = this.pageData.socialMedia.youtube;
            if (youtube != null) {
                youtube = null;
                this.pageData.socialMedia.youtube = youtube;

                saveToLocalStorage(this.key, this.pageData);

                this.youtubeInputBox.placeholder = 'Enter Your Youtube URL';
                alert('Social Link Removed.');
                let trashBtn = document.getElementById('youtubeTrashBtn');
                trashBtn.classList.add('hide');
            }
        }

        if (event.target.parentNode.id == 'twitterLinkInputDiv') {
            let twitter = this.pageData.socialMedia.twitter;
            if (twitter != null) {
                twitter = null;
                this.pageData.socialMedia.twitter = twitter;

                saveToLocalStorage(this.key, this.pageData);

                this.twitterInputBox.placeholder = 'Enter Your Twitter URL';
                alert('Social Link Removed.');
                let trashBtn = document.getElementById('twitterTrashBtn');
                trashBtn.classList.add('hide');
            }
        }

        if (event.target.parentNode.id == 'linkedinLinkInputDiv') {
            let linkedin = this.pageData.socialMedia.linkedin;
            if (linkedin != null) {
                linkedin = null;
                this.pageData.socialMedia.linkedin = linkedin;

                saveToLocalStorage(this.key, this.pageData);

                this.linkedinInputBox.placeholder = 'Enter Your LinkedIn URL';
                alert('Social Link Removed.');
                let trashBtn = document.getElementById('linkedinTrashBtn');
                trashBtn.classList.add('hide');
            }
        }

        if (event.target.parentNode.id == 'soundcloudLinkInputDiv') {
            let soundcloud = this.pageData.socialMedia.soundcloud;
            if (soundcloud != null) {
                soundcloud = null;
                this.pageData.socialMedia.soundcloud = soundcloud;

                saveToLocalStorage(this.key, this.pageData);

                this.soundcloudInputBox.placeholder = 'Enter Your Soundcloud URL';
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