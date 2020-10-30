// retreive tasks from data store
export function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}
// save to tasks to data store
export function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}