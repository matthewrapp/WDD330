// Holds all the to-do list logic

// add a new task
// remove  or delete taks
// complete task
// sort tasks
// filter tasks
// complete by date & time
//
// retreive tasks from data store
// save to tasks to data store
// remove tasks from data store
//
// display to-do list  
    // get list element
    // retrieve tasks from data store
    // for each task, build out the html
    // add task to list

// import named export from 'utilities.js' 
import { qs, saveToLocalStorage, getFromLocalStorage } from './utilities.js';
let tasks = [];

export class Todo {
    // key is for local storage, parentId is the ID for the ul element in HTML
    constructor(parentId, key) {
        this.listParent = qs(parentId);
        this.key = key;
    }

    // adding a new todo/task
    addNewTask(text) {
        console.log(text);
        const newTask = {
            id: new Date(),
            text: text,
            completed: false
        }
        tasks.push(newTask);
        // save the task to local storage
        saveToLocalStorage(this.key, newTask);
        buildTodoList(this.listParent);
    }

    showTasks(text) {
        buildTodoList()
    }

}

// display function
export function buildTodoList(parentElement) {
    console.log('hello');
    Array.from(parentElement).forEach(function(task) {
       console.log('parentElement');
    todoList.innerHTML += '<li>' + " " + Todo.addNewTask.text + " " + Todo.addNewTask.id + '</li>';
   });
}

// adjectives.forEach(function(item) {
//     console.log(item);
// });
