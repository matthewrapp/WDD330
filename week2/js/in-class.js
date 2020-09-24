// Class console example of using 'let', 'const', 'var'
function doSomething() {
    let one = "one";
    let two = "two";
    if(one) {
        var three = "three";
    }
    console.log(one);
    console.log(two);
    console.log(three);
}
doSomething();

// Array used for examples below
const colors = ["red", "blue", "yellow", "green", "orange"];

// Class example
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
};
console.dir(colors);

// Class example
function log(message, index) {
    console.log(index, message);
}
colors.forEach(log);

// This is anonymos function
// Can only work within the function itself. Can't call it later.
colors.forEach(function(item) {
    console.log(item);
});

// Another way to write a function
// Function Negative (OG way)
    function negative(num) {
        return num * -1;
    }
// Function Expression
// Anonymous function declared inside a variable
    const negativeOne = function(num) {
        return num * -1;
    }
    negative(1);
    negative(2);

// Arrow Function
// Anonymous function declared inside a variable
    const negative3 = (num) => {
        return num * -1;
    }
    // Could also write it like this
    const negative4 = (num) => num * -1;

//Another example
// Taking the numbers, store them in another variable that multiplies each number by -1.
const numbers = [1, 4, 7, 34, 54, 243, 67, 89, 21, 12345];
const negNumbers = numbers.map((num) => num * -1);

console.log(negNumbers);

// ForEach example
const adjectives = [
    "bold",
    "shy",
    "strong",
    "lazy",
    "active",
    "smart",
    "old",
    "dumb",
];
adjectives.forEach(function(item) {
    console.log(item);
});

// How to get a range from 1-6, randomly
console.log(Math.floor(Math.random() * 6) + 1);
console.log(Math.floor(Math.random() * colors.length) + 1);

function rand(range, offset) {
    return Math.floor(Math.random() * range) + offset
};

// For homework, if you want, make a random sentence generator
// This week, do reading, makes notes, exercises of the reading. Throw it in portfolio, turn it in.
// Complete team activity



// Javascript is actually called Ecmascript, hint at *ES6 label
// Scope = Where something can be seen
// "let" has to be within the same block for it to work.
// "var" is more for global scope
// "const" works more like "let" where it can only work within the same block