// setInterval animation
// const squareElement = document.getElementById('square');
// let angle = 0;
// setInterval(() => {
//     angle = (angle + 2) % 360;
//     squareElement.style.transform = `rotate(${angle}deg)`
// }, 1000 / 60);

// requestAnimationFram animation
// Difference is these include making the most of the browswer's built-in graphics-handling capabilities, and not running the animation when the tab is inactive
const squareElement = document.getElementById('square');
let angle = 0;

function rotate() {
    angle = (angle + 2) % 360;
    squareElement.style.transform = `rotate(${angle}deg)`
    window.requestAnimationFrame(rotate);
}
const id = requestAnimationFrame(rotate);