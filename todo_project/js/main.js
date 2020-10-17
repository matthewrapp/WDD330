// import 
import { Todo } from './todo.js';

document.querySelector('#addButton').addEventListener('click', function(event) {
    console.log('helo');
    const todo = new Todo('#todoList', new Date());
    todo.addNewTask(document.querySelector('#todoInput').value);
});
