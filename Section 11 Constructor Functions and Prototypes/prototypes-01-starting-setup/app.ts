// Define an interface for the shape of the Person object
interface IPerson {
	name: string;
	age: number;
	greet: () => void;
	printAge: () => void;
}

class AgedPerson {
	constructor(public age: number = 28) {}
	printAge() {
		console.log(this.age);
	}
}

class Person extends AgedPerson {
	constructor(public name: string = "Tomi", public age: number = 28) {
		super(age);
	}

	greet() {
		console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
	}
}

// // Constructor function with proper types
// function Person(this: IPerson) {
// 	this.name = "Tomi";
// 	this.age = 28;
// 	this.greet = function () {
// 		console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
// 	};
// }

// Person.prototype.greet = function () {
// 	console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
// };

// Person.describe = function () {
// 	console.log("Creating persons...");
// };

// // Manually set the prototype methods correctly
// Person.prototype.printAge = function () {
// 	console.log(this.age);
// };

// // TypeScript recognizes the types correctly, no need to type __proto__ explicitly
// const person = new (Person as any)() as IPerson; // TypeScript workaround to handle the "new" keyword
// console.dir(Person);
// console.dir(person);
// person.greet(); // Output: Hello, my name is Tomi and I am 28 years old.
// person.printAge(); // Output: 28

// // Checking prototype equivalence
// console.log(Object.getPrototypeOf(person) === Person.prototype); // Output: true
// console.log(Object.getPrototypeOf(person)); // Output: { printAge: [Function: printAge] }
// const p2 = new (Object.getPrototypeOf(person).constructor)();
// console.dir(Object);
// // console.log(p2);

const p = new Person();
const p2 = new Person();
console.log(Object.getPrototypeOf(p) === Object.getPrototypeOf(p2));

/* 
class AgedPerson {
  printAge() {
    console.log(this.age);
  }
}

class Person {
  name = 'Max';

  constructor() {
    // super();
    this.age = 30;
    // this.greet = function() { ... }
  }

  // greet = () => {
  //   console.log(
  //     'Hi, I am ' + this.name + ' and I am ' + this.age + ' years old.'
  //   );
  // };

  greet() {
    console.log(
      'Hi, I am ' + this.name + ' and I am ' + this.age + ' years old.'
    );
  }
}

// function Person() {
//   this.age = 30;
//   this.name = 'Max';
//   // this.greet = function() { ... };
// }

// Person.prototype.greet = function() {
//   console.log(
//     'Hi, I am ' + this.name + ' and I am ' + this.age + ' years old.'
//   );
// };

// Person.describe = function() {
//   console.log('Creating persons...');
// }

// Person.prototype = {
//   printAge() {
//     console.log(this.age);
//   }
// };

// Person.prototype.printAge = function() {
//   console.log(this.age);
// };

// console.dir(Person);

// const p = new Person();
// p.greet();
// p.printAge();
// console.log(p.length);
// console.log(p.toString());
// const p2 = new p.__proto__.constructor();
// console.dir(Object.prototype.__proto__);

const p = new Person();
const p2 = new Person();
p.greet();
console.log(p);

const button = document.getElementById('btn');
button.addEventListener('click', p.greet.bind(p));
 */
