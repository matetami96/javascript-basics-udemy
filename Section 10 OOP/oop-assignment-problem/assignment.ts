// Teacher's Solution
class Course {
	#price: number | null = null;
	get price(): string {
		return "$" + this.#price;
	}

	set price(value: number) {
		if (value < 0) {
			throw "Price cannot be negative";
		} else {
			this.#price = value;
		}
	}

	constructor(public title: string, public _price: number, public length: number) {
		this.price = _price;
	}

	calculateValue() {
		return this.length / this.#price!;
	}

	printSummary() {
		console.log(`Title: ${this.title}, Length: ${this.length}, Price: ${this.price}`);
	}
}

const jsCourse = new Course("JavaScript Full Course", 50, 44);
const reactCourse = new Course("React.js Full Course", 50, 34);

console.log(jsCourse);
console.log(reactCourse);

console.log(jsCourse.calculateValue());
console.log(reactCourse.calculateValue());

jsCourse.printSummary();
reactCourse.printSummary();

class PracticalCourse extends Course {
	constructor(public title: string, public _price: number, public length: number, public numOfExercises: number) {
		super(title, _price, length);
	}
}

const angularCourse = new PracticalCourse("Angular.js Full Course", 36, 50, 10);

console.log(angularCourse);
angularCourse.printSummary();

class TheoreticalCourse extends Course {
	publish() {
		console.log("Publishing...");
	}
}

const flutterCourse = new TheoreticalCourse("Flutter - Build iOS and Android Apps", 50, 48);

flutterCourse.price = 3000;

flutterCourse.printSummary();
flutterCourse.publish();

// My Solution
/* // Task 1
class Course {
    // Task 4
	get coursePrice(): string {
		return `\$${this.#price}`;
	}

	set coursePrice(price: number) {
		if (price >= 0) {
			this.#price = price;
		} else {
			return;
		}
	}

	// Task 5
	#price: number;
	constructor(public title: string, public length: number, public price: number) {
		this.#price = price;
	}

	// Task 2
	calculateLengthPrice() {
		return (this.length / +this.#price).toFixed(2);
	}

	showSummary() {
		return `Title: ${this.title}, Length: ${this.length}, Price: ${this.#price}`;
	}
}

// Task 3
class PracticalCourse extends Course {
	constructor(public title: string, public length: number, public price: number, public numOfExercises: number) {
		super(title, length, price);
	}
}

class TheoreticalCourse extends Course {
	constructor(public title: string, public length: number, public price: number) {
		super(title, length, price);
	}

	publish() {
		console.log("Publishing theoretical course...");
	}
}

const course1 = new Course("JavaScript", 360, 100);
const course2 = new Course("PHP", 500, 150);
const practicalCourse = new PracticalCourse("Angular", 360, 100, 10);
const theoreticalCourse = new TheoreticalCourse("C#", 500, 150);

console.log("Courses: ", course1, course2);
console.log("Course1 length/price: ", course1.calculateLengthPrice());
console.log("Course2 summary: ", course2.showSummary());
console.log("PracticalCourse length/price: ", practicalCourse.calculateLengthPrice());
console.log("PracticalCourse summary: ", practicalCourse.showSummary());
console.log("PracticalCourse numOfExercises: ", practicalCourse.numOfExercises);
theoreticalCourse.publish();
course1.coursePrice = -5;
console.log("Course 1 new price ", course1.coursePrice);
 */
