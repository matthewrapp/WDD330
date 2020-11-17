import {
    search
} from './search.js';

const queryBox = document.getElementById('searchBox');
// function is in search.js
queryBox.addEventListener('keyup', search);