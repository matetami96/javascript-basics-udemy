/* My solution

// Task 1
const sayHello = (name: string) => console.log("Calling sayHello as an arrow func => Hi " + name);
sayHello("Tomi");

// Task 2 + 3
const sayHello2 = (name: string, greeting: string = "Greetings ") => console.log("Calling sayHello2 with 2 args => " + greeting + name);
sayHello2("Tomi");

const sayHello3 = () => console.log("Calling sayHello3 with no args => Hello World!");
sayHello3();

const sayHello4 = (val: string) => val;
console.log(sayHello4("Say hi with sayHello4's returned value!"));

// Task 4
const checkInput = (cb: () => void, ...strings: string[]) => {
	let noEmptyStrings = true;

	for (const string of strings) {
		if (string.length === 0) {
			noEmptyStrings = false;
			break;
		}
	}

	if (noEmptyStrings) {
		cb();
	}
};

checkInput(
	() => {
		alert("No empty strings detected!");
	},
	"Hey",
	"Ho",
	"Hy",
	"Yo"
);
 */

// Teacher's solution

// T 1
const sayHello = (name: string) => console.log("Hi " + name);

const sayHello2 = (name: string, phrase: string) => console.log(phrase + " " + name);
const sayHello3 = () => console.log("Hi hard-coded");
const sayHello4 = (name: string) => "Hi " + name;

sayHello("Tomi");
sayHello2("Tomi", "Hello");
sayHello3();
console.log(sayHello4("Tomi"));

const sayHello5 = (name: string, phrase = "Hi") => console.log(phrase + " " + name);

sayHello5("Emoci");
sayHello5("Emoci", "Szia");

function checkInput(cb: () => void, ...strings: string[]) {
	let hasEmptyText = false;

	for (const text of strings) {
		if (!text) {
			hasEmptyText = true;
			break;
		}
	}

	if (!hasEmptyText) {
		cb();
	}
}

checkInput(
	() => {
		console.log("All not empty!");
	},
	" 1",
	"hey",
	"123",
	"1"
);
