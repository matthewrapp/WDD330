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
const todos = [];
export function saveTodos(key, data) {
    saveToLocalStorage(key, data);
}

class Todo {
    // constructor special func that will automatically get called when you do 'new' (const myTody) = new Todo();
    constructor(parentId, key) {
         this.listElement = qs(parentId);
         this.key = key;
    }

    // funciton in a class is a 'method' & you do NOT add function keyword
    addNewTodo(text) {
        const newTodo = {
            id: new Date(),
            text: text,
            completed: false,
        }

        let todoList = document.getElementById("todoList");
        todoList.innerHTML += '<li>' + " " + newTodo.text + " " + newTodo.id + '</li>';

        todos.push(newTodo);
        saveTodos(this.key, todos);
    }

    completeTodo(todo) {

    }

    removeTodo(todo) {

    }

    loadTodos() {
        let jsonList = getFromLocalStorage(this.key);
        console.log(jsonList);
        let todoList = JSON.parse(jsonList || "[]");
        todoList.forEach(item => {
            this.listElement.innerHTML += '<li>' + " " + item.text + " " + item.id + '</li>';
        })
    }

}

export default Todo;