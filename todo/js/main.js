// import named export
import { qs, setClick} from './utilities.js';
// import default export
import Todo, { } from './todo.js';

const myTodo = new Todo('#todoList', 'todos');


// qs("#addButton").addEventListener("click", myTodo.addNewTodo);
// qs("#addButton").addEventListener("click", () => {
//     let todoInput = qs("#todoInput").value;
//     myTodo.addNewTodo(todoInput);
// });

// when the window loads, load the task list
window.onload = (event) => {
    myTodo.loadTodos();
}

// event listener, 'click', for the actions of the buttons (DESKTOP)
// document.addEventListener("click", (e) => {
//     if (e.target.className == "remove") {
//         let idToDelete = e.target.getAttribute("data-todoItemId");
//         console.log(`Removing item with id: ${idToDelete}`);
//         let elementToDelete = e.target.parentElement;

//         myTodo.removeTodo(idToDelete, elementToDelete);
//     } else if (e.target.id == "complete") {
//         let idThatComplete = e.target.getAttribute("data-todoItemId");
//         console.log(`Item with id ${idThatComplete} is completed`);
//         let elementCompleted = e.target.parentElement;

//         myTodo.completeTodo(idThatComplete, elementCompleted);
//     } else if (e.target.id == "addButton") {
//         let todoInput = qs("#todoInput").value;
//         console.log(`Adding todo item ${todoInput}`);

//         myTodo.addNewTodo(todoInput);
//         qs("#todoInput").value = "";
//     }
// })

// Create function for our helper function 'Touchend' & 'Click'
function targetAction(event) {
    if (event.target.className == "remove") {
        let idToRemove = event.target.getAttribute("data-todoItemId");
        // console.log(`Removing item with id: ${idToRemove}`);
        let elementToDelete = event.target.parentElement.parentElement;

        myTodo.removeTodo(idToRemove, elementToDelete);

    } else if (event.target.className == "complete") {
        let idToComplete = event.target.getAttribute("data-todoItemId");
        let elementToComplete = event.target.parentElement.parentElement;
        
        myTodo.completeTodo(idToComplete, elementToComplete);
        
    } else if (event.target.id == "addButton") {
        let todoInput = qs("#todoInput").value;
        if (todoInput == "" || todoInput == null) {
            alert('Must input something!')
        } else {
            myTodo.addNewTodo(todoInput);
            qs("#todoInput").value = "";
            console.log(`Adding todo item ${todoInput}`);
        }
        
    }
}
// Call helper function, selector = body, callback is targetAction
setClick("body", targetAction);