import {
    makeRequest
} from './utilities.js';

import Auth from './auth.js';

makeRequest('login', 'POST', {
    password: 'user1',
    email: 'user1@email.com'
});

const auth = new Auth();
const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    auth.login();
})