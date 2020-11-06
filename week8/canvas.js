// grab hold of the canvas element
let canvas = document.getElementById("myCanvas");

// set up the canvas's context (the place where your drawing is rendered.)
// obtain our drawing context by calling the getContext method and passing it to the string "2d", since we'll be drawing in two dimensions
let context = canvas.getContext("2d");

// Must saturate your brush with paint before you can begin
// strokeStyle & fillStyle are set on a context object, and both take one of three values: a string representing a color, a CanvasGradient object, or a Canvas Pattern object
context.strokeStyle = "red";
// context.fillStyle = "blue";
// context.fillRect(10, 10, 100, 100);
// context.strokeRect(10, 10, 100, 100);
var gradient = context.createLinearGradient(0, 0, 0, 200);
gradient.addColorStop(0, "blue");
gradient.addColorStop(1, "white");
context.fillStyle = gradient;
context.fillRect(10, 10, 100, 100);
context.strokeRect(10, 10, 100, 100);