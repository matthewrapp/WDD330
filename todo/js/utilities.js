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
// set a listener