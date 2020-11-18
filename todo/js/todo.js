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
import {
    qs,
    saveToLocalStorage,
    getFromLocalStorage
} from './utilities.js';

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
        this.removedKey = key + 'removed';
        this.todoItems = [];
        this.removedTodoItems = [];
    }

    // funciton in a class is a 'method' & you do NOT add function keyword
    addNewTodo(text) {
        const newTodo = new todoItem(text);
        this.todoItems.push(newTodo);

        // create variables for within the buttons (icons or text)
        let removeSVG = `<i class="fa fa-trash"></i>`;
        let completeSVG = `<i class="fa fa-check"></i>`;
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
        completeBtn.setAttribute("data-todoItemId", newTodo.id);
        // append each button into the buttons div
        buttons.appendChild(completeBtn);
        buttons.appendChild(removeBtn);

        // create list item (li)
        let todoList = document.getElementById("todoList");
        todoList.innerHTML += `<li class="task incompleted-task" id=${newTodo.id} data-id=${newTodo.id}><span class="text">` + text + `</span><div class="buttons">` + buttons.innerHTML + `</div></li>`;

        // save to local storage
        // todos.push(newTodo);
        saveTodos(this.key, this.todoItems);

    }

    getTodoItem(id) {
        return this.todoItems.find(item => item.id == id);
    }

    // remove todo items and put into another array
    // removeTodo(id, elementToDelete) {
    //     let notDeletedItemsList = [];
    //     this.todoItems.forEach(item => {
    //         if (item.id != id) {
    //             notDeletedItemsList.push(item);
    //         } else {
    //             this.removedTodoItems.push(item);
    //         }
    //     })

    //     elementToDelete.remove();
    //     this.todoItems = notDeletedItemsList;

    //     // reset local storage
    //     saveTodos(this.key, this.todoItems);
    //     saveTodos(this.removedKey, this.removedTodoItems);
    // }

    completeTodo(id, elementToComplete) {
        let changedItem;
        this.todoItems.forEach(item => {
            if (item.id == id) {
                console.log(item.id, item.completed, item.text);
                item.completed = true;
                changedItem = item;
            }
        })

        let removeSVG = `<i class="fa fa-trash"></i>`;
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('remove');
        removeBtn.innerHTML = removeSVG;
        removeBtn.setAttribute("data-todoItemId", id);
        // create buttons div
        let buttons = document.createElement('div');
        buttons.classList.add("buttons");
        // append each button into the buttons div
        buttons.appendChild(removeBtn);

        let todoList = document.getElementById("completedTodos");
        elementToComplete.innerHTML = `<li class="task completed-task" id=${changedItem.id} data-id=${changedItem.id}><span class="text">` + changedItem.text + `</span><div class="buttons">` + buttons.innerHTML + `</div></li>`;
        todoList.innerHTML += elementToComplete.innerHTML;
        elementToComplete.remove();

        // reset local storage
        saveTodos(this.key, this.todoItems);
    }

    // load todos
    loadTodos() {
        let jsonList = getFromLocalStorage(this.key);
        let items = JSON.parse(jsonList || "[]");
        this.listElement.childNodes.forEach(child => child.remove());
        this.todoItems = [];

        jsonList = getFromLocalStorage(this.removedKey);
        let removedItems = JSON.parse(jsonList || "[]");

        if (removedItems != null) {
            removedItems.forEach(item => {
                this.removedTodoItems.push(item);
            })
        }

        if (items != null) {
            items.forEach(item => {
                this.todoItems.push(item);
                if (!item.completed) {
                    // create variables for within the buttons (icons or text)
                    let removeSVG = `<i class="fa fa-trash"></i>`;
                    let completeSVG = `<i class="fa fa-check"></i>`;
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
                    completeBtn.setAttribute("data-todoItemId", item.id);
                    // append each button into the buttons div
                    buttons.appendChild(completeBtn);
                    buttons.appendChild(removeBtn);

                    // create list item (li)
                    let todoList = document.getElementById("todoList");
                    todoList.innerHTML += `<li class="task incompleted-task" id=${item.id} data-id=${item.id}><span class="text">` + item.text + `</span><div class="buttons">` + buttons.innerHTML + `</div></li>`;
                } else {
                    // create variables for within the buttons (icons or text)
                    let removeSVG = `<i class="fa fa-trash"></i>`;
                    // create buttons div
                    let buttons = document.createElement('div');
                    buttons.classList.add("buttons");
                    // create remove task button
                    let removeBtn = document.createElement('button');
                    removeBtn.classList.add('remove');
                    removeBtn.innerHTML = removeSVG;
                    removeBtn.setAttribute("data-todoItemId", item.id);
                    // append each button into the buttons div
                    buttons.appendChild(removeBtn);

                    let todoList = document.getElementById("completedTodos");
                    todoList.innerHTML += `<li class="task completed-task" id=${item.id} data-id=${item.id}><span class="text">` + item.text + `</span><div class="buttons">` + buttons.innerHTML + `</div></li>`;
                }

            })

        }
    }

}


export default Todo;