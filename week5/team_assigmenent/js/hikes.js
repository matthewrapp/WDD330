// create wrapper for querySelector to save typing
function qs(selector) {
    return document.querySelector(selector);
}

// Create the class to setup the template of hike information needed and layout
export class Hike {
    constructor(name, imgSrc, imgAlt, distance, difficulty, description, directions) {
        this.name = name;
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.distance = distance;
        this.difficulty = difficulty;
        this.description = description;
        this.directions = directions;
    }

    renderHike() {
        let hikeHtml = 
        `<h2>${this.name}</h2>
        <div class="wrapper">
            <div class="img-div">
                <img src=https://byui-cit.github.io/cit261/examples/${this.imgSrc} 
        alt="${this.imgAlt}" />
            </div>
            <div class="content">
                <div>
                    <h3>Distance</h3>
                    <p>${this.distance}</p>
                </div>
                <div>
                    <h3>Difficulty</h3>
                    <p>${this.difficulty}</p>
                </div>
                <div>
                    <h3>Description</h3>
                    <p>${this.description}</p>
                </div>
                <div>
                    <h3>Directions</h3>
                    <p>${this.directions}</p>
                </div>
            </div>
        </div>`

        return hikeHtml;
    }

}

// Create a class to return the hike created into a list
export class HikeManager {
        // this method/function creates the 'li' (HTML) element
        renderHikeList(list) {
            const hikeList = qs('#allHikes');
            hikeList.innerHTML = "";
            console.log('Works here');
            // each list item (li)
            list.forEach(hike => {
                console.log('Doesnt get passed here');
                const newLi = document.createElement('li');
                newLi.innerHTML = hike.renderHike();
                hikeList.appendChild(newLi);
            })
        }
}