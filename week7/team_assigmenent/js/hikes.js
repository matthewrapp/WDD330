// import named export from 'utilities.js'   
import {
    saveToLocalStorage,
    getFromLocalStorage
} from './utilities.js';

let comments = [];

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
        let jsonList = getFromLocalStorage('comments');
        let comments = JSON.parse(jsonList);
        let newComments = comments.filter(comment => comment.name === this.name);
        console.log(newComments);
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
                <div>
                    <h3>Comments</h3>
                    <input type="text" class="comment" id="${this.name}" />
                    <button class="addCommentBtn">Add Comment</button>
                    <p></p>
                </div>
            </div>
        </div>`

        return hikeHtml;
    }
}

export class Comment {
    constructor(name, content) {
        this.name = name;
        this.date = Date.now();
        this.content = content;
    }

    addNewComment() {
        comments.push({
            name: this.name,
            content: this.content
        });
    }

    saveComment() {
        saveToLocalStorage("comments", comments);
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

export function clickHandle() {
    let addBtn = document.getElementsByTagName("button");
    addBtn = [...addBtn];
    addBtn.forEach(btn => {
        btn.addEventListener("click", (event) => {
            console.log(event);
            let userComment = event.target.previousElementSibling;
            let comment = new Comment(userComment.id, userComment.value);
            console.log(comment);
            comment.addNewComment();
            comment.saveComment();
        })
    })
}