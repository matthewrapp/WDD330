// import named export
import { qs } from './utilities.js';
// import default export
import Todo, { saveTodos } from './todo.js';



const myTodo = new Todo('#todoList', 'todos');

// qs("#addButton").addEventListener("click", myTodo.addNewTodo);
qs("#addButton").addEventListener("click", () => {
    let todoInput = document.getElementById("todoInput").value;
    myTodo.addNewTodo(todoInput);
});

window.onload = () => {
    myTodo.loadTodos();
}


