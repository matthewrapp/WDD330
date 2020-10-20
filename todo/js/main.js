// import named export
import { qs } from './utilities.js';
// import default export
import Todo, { } from './todo.js';

const myTodo = new Todo('#todoList', 'todos');


// qs("#addButton").addEventListener("click", myTodo.addNewTodo);
// qs("#addButton").addEventListener("click", () => {
//     let todoInput = qs("#todoInput").value;
//     myTodo.addNewTodo(todoInput);
// });

window.onload = (event) => {
    myTodo.loadTodos();
}

document.addEventListener("click", (e) => {
    if (e.target) {
        if (e.target.className == "remove") {
            let idToDelete = e.target.getAttribute("data-todoItemId");
            console.log(`Removing item with id: ${idToDelete}`);
            let elementToDelete = e.target.parentElement;

            myTodo.removeTodo(idToDelete, elementToDelete);
        } else if (e.target.id == "addButton") {
            let todoInput = qs("#todoInput").value;
            console.log(`Adding todo item ${todoInput}`);

            myTodo.addNewTodo(todoInput);
            qs("#todoInput").value = "";
        }
    }
})

// qs(".remove").addEventListener("click", () => {
//     console.log(newTodo.id);
// });

// qs(".remove").addEventListener("click", function(e) {
//     if (e.target.className == "remove") {
//         alert('Clicked');
//     }
// });
