// get list element
// create wrapper for querySelector to save typing later
export function qs(selector) {
    return document.querySelector(selector);
}

// retreive tasks from data store
export function getFromLocalStorage(key) {
   return localStorage.getItem(key);
}
// save to tasks to data store
export function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for click & touchend
export function setClick(selector, callback) {
    qs(selector).addEventListener('touchend', (event) => {
        event.preventDefault();
        callback(event);
    });
    // qs(selector).addEventListener('click', (callback));
}

// remove btn
// export function removeBtn(id) {
//     let removeBtn = document.createElement('button');
//     let removeSVG = "Remove"// `<i class="fa fa-trash"></i>`;
//         removeBtn.classList.add('remove');
//         removeBtn.innerHTML = removeSVG;
//         removeBtn.setAttribute("data-todoItemId", id);
// }

// complete btn
// export function completeBtn(id) {
//     let completeBtn = document.createElement('button');
//     let completeSVG = "Check" // `<i class="fa fa-check"></i>`
//         completeBtn.classList.add('complete');
//         completeBtn.innerHTML = completeSVG;
//         completeBtn.setAttribute("data-todoItemId", id);
// }