// Create a class to create ninja turtles
class Turtle {
    constructor(name, weapon) {
        this.name = name;
        this.weapon = weapon;
    }
    sayHi() {
        return `Hi dude, my name is ${this.name}!`;
    }
    attack() {
        return `Feel the power of my ${this.weapon}!!`;
    }
}

// Create a new turtle instance
const leo = new Turtle('Leonardo', 'Stick', 'Purple');
console.log(leo);
console.log(leo.sayHi());
console.log(leo.attack());

// Create using Prototype
Turtle.prototype.color = "green";

// Finding out the protoype
console.log(Object.getPrototypeOf(leo));

// Check if leo is an instance of turtle | Should output 'true'
console.log(Turtle.prototype.isPrototypeOf(leo));

// Check if leo has own properties or is inherited from the prototype
console.log(leo.hasOwnProperty('name'));
console.log(leo.hasOwnProperty('weapon'));
console.log(leo.hasOwnProperty('green')); // should return false because color green was adding using prototype

// Assign new value to properties
leo.weapon = 'blades';
console.log(leo.weapon);
console.log(leo.attack()); // should change to 'Feel the power of my blades!!'

// Check to see if enumerable
console.log(Turtle.prototype.propertyIsEnumerable('green')); // each of my properties say false

// Inheritence using extends. Create another class that extended from the parent ninja class
class NinjaTurtle extends Turtle {
    constructor(name, weapon, home) {
        super(name, weapon);
        this.home = home;
    }
    living() {
        return `My home is ${home}.`
    }
}
// Create new instance using extended/inhereted class
const ralph = new NinjaTurtle('Ralph', 'Chains', 'Sewer');
console.log(ralph);
NinjaTurtle.prototype.color = "blue";
console.log(Object.getPrototypeOf(ralph));