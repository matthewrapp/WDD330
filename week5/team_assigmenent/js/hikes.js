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

export function renderHikeList(list) {
    let hikeList = document.querySelector('#allHikes');
    hikeList.innerHTML = "";
    list.forEach(function (object) {
        const newLi = document.createElement('li');
        newLi.innerHTML = object.hike.renderHike();
        hikeList.appendChild(newLi);
    })
}