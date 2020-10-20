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
// const todos = [];
export function saveTodos(key, data) {
    saveToLocalStorage(key, data);
}

class todoItem {
    constructor(text) {
        this.text = text;
        this.id = new Date();
        this.completed = false;
    }

    complete() {
        this.completed = true;
    }
}


class Todo {
    // constructor special func that will automatically get called when you do 'new' (const myTody) = new Todo();
    constructor(parentId, key) {
         this.listElement = qs(parentId);
         this.key = key;
         this.todoItems = [];
    }

    // funciton in a class is a 'method' & you do NOT add function keyword
    addNewTodo(text) {
        const newTodo = new todoItem(text);
        this.todoItems.push(newTodo);

        // create variables for within the buttons (icons or text)
        let removeSVG = "Remove"// `<i class="fa fa-trash"></i>`;
        let completeSVG = "Check" // `<i class="fa fa-check"></i>`;
        // create buttons div
        let buttons = document.createElement('div');
        buttons.classList.add("buttons");
        // create remove task button
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('remove');
        removeBtn.innerHTML = removeSVG;
        removeBtn.setAttribute("data-todoItemId", newTodo.id);
        // create complete task button
        let completeBtn = document.createElement('button');
        completeBtn.classList.add('complete');
        completeBtn.innerHTML = completeSVG;
        // append each button into the buttons div
        buttons.appendChild(completeBtn);
        buttons.appendChild(removeBtn);

        // create list item (li)
        let todoList = document.getElementById("todoList");
        todoList.innerHTML += '<li class="task">' + " " + text + buttons.innerHTML + '</li>';

        // save to local storage
        // todos.push(newTodo);
        saveTodos(this.key, this.todoItems);

    }

    getTodoItem(id) {
        return this.todoItems.find(item => item.id == id);
    }

    // remove todo items and put into another array
    removeTodo(id, elementToDelete) {
        let deletedItemsList = [];
        this.todoItems.forEach(item => {
            if (item.id != id) {
                deletedItemsList.push(item);
            }
        })

        elementToDelete.remove();
        this.todoItems = deletedItemsList;

        // reset local storage
        saveTodos(this.key, this.todoItems);
    }

    // load todos
    loadTodos() {
        let jsonList = getFromLocalStorage(this.key);
        let items = JSON.parse(jsonList || "[]");
        this.listElement.childNodes.forEach(child => child.remove());
        this.todoItems = [];

        if (items != null) {
            items.forEach(item => {
            this.todoItems.push(item);

            // create variables for within the buttons (icons or text)
            let removeSVG = "Remove"// `<i class="fa fa-trash"></i>`;
            let completeSVG = "Check" // `<i class="fa fa-check"></i>`;
            // create buttons div
            let buttons = document.createElement('div');
            buttons.classList.add("buttons");
            // create remove task button
            let removeBtn = document.createElement('button');
            removeBtn.classList.add('remove');
            removeBtn.innerHTML = removeSVG;
            removeBtn.setAttribute("data-todoItemId", item.id);
            // create complete task button
            let completeBtn = document.createElement('button');
            completeBtn.classList.add('complete');
            completeBtn.innerHTML = completeSVG;
            // append each button into the buttons div
            buttons.appendChild(completeBtn);
            buttons.appendChild(removeBtn);

            // create list item (li)
            let todoList = document.getElementById("todoList");
            todoList.innerHTML += '<li class="task">' + " " + item.text + buttons.innerHTML + '</li>';

            }) 
        }
    }

}


export default Todo;