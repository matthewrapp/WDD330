const form = document.forms['todo'];
form.addEventListener('submit', addTask, false);

// Send task manually (1st Demo)
// function addTask(event) {
//     event.preventDefault();
//     const number = form.task.value;
//     const task = {
//         userId: 1,
//         title: form.task.value,
//         completed: false
//     }
//     const data = JSON.stringify(task);
//     const url = 'https://jsonplaceholder.typicode.com/todos';
//     const headers = new Headers({
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     });
//     const request = new Request(form.action, {
//         method: form.method,
//         header: headers,
//         body: data
//     })
//     fetch(request)
//         .then(response => response.json())
//         .then(task => console.log(`Task saved with an id of ${task.id}`))
//         .catch(error => console.log('There was an error:', error))
// }

// Send task automatically (2nd Demo)
function addTask(event) {
    event.preventDefault();
    const task = new FormData(form);
    const url = `http://echo.jsontest.com/id/1/title/${form.task.value}`;
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    const request = new Request(form.action, {
        method: form.method,
        mode: 'cors',
        header: headers,
        body: JSON.stringify(task)
    })
    fetch(request)
        .then(response => response.json())
        .then(data => console.log(`${data.title} saved with an id of ${data.id}`))
        .catch(error => console.log('There was an error:', error))
}