// Return form using index notation
// const form = document.forms[0];
// This is equivilent to using this method
// const form = document.getElementsByTagName('form')[0];
// We could also use the name attribute to identify a form; 'search' is the name attribute
const mattForm = document.forms.search;

// Access the form contols using their 'name attributes
const input = mattForm.searchInput;
// Can also use bracket notation if there are any naming clashes with existing property and method names, or if name is an invalid variable name
// const input = form['searchInput'];

// constant for InputBox
const inputBox = mattForm.elements.searchInput;

// Add focus event to the input box
// inputBox.addEventListener('focus', function() {
//     console.log('focused');
// }, false);

// Add blur event to the input box
// inputBox.addEventListener('blur', () => alert('blurred'), false);

// Add submit event
// 'search' is the name attribute of the form
// once the alert box goes away, it is submitting to the URL (action) in the form tag in the HTML
// One way to do it
// form.addEventListener ('submit', newsearch, false);
// function search(event) {
//     alert(' Form Submitted');
//     event.preventDefault();
//     document.getElementsByTagName('h6')[0].innerHTML = "Submitted!";
// }
// function newsearch(event) {
//     alert(`You Searched for: ${inputBox.value}`);
//     event.preventDefault();
// }
// Another way to do it
mattForm.addEventListener ('submit', function () {
    alert(`You Searched for: ${inputBox.value}`);
    event.preventDefault();
}, false);

// Set the default value using Javascript
inputBox.value = 'Search Here';

// Set the default text only when 'blur' event
// When the focus event is on, it gets rid of the default text
inputBox.addEventListener('focus', function() {
    if (inputBox.value==='Search Here') {
        inputBox.value = '' 
    }
}, false);
inputBox.addEventListener('blur', function() {
    if(inputBox.value === '') {
        inputBox.value = 'Search Here';
    } }, false);