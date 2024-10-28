interface IGreetable {
	name: string;
}

interface Printable {
	print(): void;
}

class User implements IGreetable, Printable {
	/* name: string;
	private age: number;
	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	} */

	constructor(public name: string, private age: number) {}

	print() {
		console.log(this.name);
	}
}

class Admin extends User {
	constructor(name: string, age: number, private permissions: string[]) {
		super(name, age);
	}
}

const user = new User("Tomi", 28);

console.log(user.name);

const input1 = document.getElementById("num1") as HTMLInputElement;
const input2 = <HTMLInputElement>document.getElementById("num2");
const button = document.querySelector("button")!;

function add(a: number, b: number) {
	return a + b;
}

type PrintMode = "console" | "alert";
enum OutputMode {
	CONSOLE,
	ALERT,
}

const printResult =
	<T>(result: T, printMode: OutputMode = OutputMode.CONSOLE) =>
	() => {
		if (printMode === OutputMode.CONSOLE) {
			console.log("Result: " + result);
		} else if (printMode === OutputMode.ALERT) {
			alert("Result: " + result);
		}
	};

const result = add(5, 3);
let isDone = false;

// console.log(result);

interface ICalculationResult {
	res: number;
	print(): void;
}
type CalculationResult = ICalculationResult[];

const results: CalculationResult = [];
const names = ["Max", "Anna"];

button.addEventListener("click", () => {
	const resultContainer = {
		res: add(+input1.value, +input2.value),
		print() {
			console.log(this.res);
		},
	};
	results.push(resultContainer);
	// results.push(5);
	printResult(resultContainer.res)();
});
