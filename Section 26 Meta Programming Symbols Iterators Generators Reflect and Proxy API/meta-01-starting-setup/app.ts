// Symbols, Iterators/ Generators, Reflect, Proxy APIs
const course = {
	title: "TypeScript",
};

Reflect.setPrototypeOf(course, {
	toString() {
		return (this as { title: string }).title;
	},
});

// Reflect.deleteProperty(course, "title");

// delete course.title;

console.log(course);

const courseHandler = {
	get(object: any, propertyName: string) {
		console.log(propertyName);

		if (propertyName === "length") {
			return 0;
		}

		// return "Tomi";
		return object[propertyName] || "NOT FOUND";
	},
	set(object: any, propertyName: string, newValue: any) {
		if (propertyName === "rating") {
			return true;
		}
		object[propertyName] = newValue;
		return true;
	},
};

const pCourse = new Proxy(course, courseHandler);
pCourse.rating = 5;
console.log(pCourse.title, pCourse.length, pCourse.rating);

// -------------------------------------------------

// const company = {
// 	// currentEmloyee: 0,
// 	employees: ["Tomi", "Emoji", "Zsolti", "Jani", "Laci"],
// 	/* next() {
// 		if (this.currentEmloyee >= this.employees.length) {
// 			return {
// 				value: this.employees,
// 				done: true,
// 			};
// 		}

// 		const returnValue = {
// 			value: this.employees[this.currentEmloyee],
// 			done: false,
// 		};
// 		this.currentEmloyee++;

// 		return returnValue;
// 	}, */
// 	// generator that returns/creates an iterator object with a next method
// 	[Symbol.iterator /* getEmployee */]: function* employeeGenerator() {
// 		let currentEmloyee = 0;

// 		while (currentEmloyee < this.employees.length) {
// 			yield this.employees[currentEmloyee];
// 			currentEmloyee++;
// 		}

// 		// let employee = company.next();

// 		// while (!employee.done) {
// 		// 	yield employee.value;
// 		// 	employee = company.next();
// 		// }
// 	},
// };

// for (const employee of company) {
// 	console.log(employee);
// }

// console.log([...company]);

// console.log(["Tomi", "Emoji", "Zsolti", "Jani", "Laci"]);

/* let iterator = company.getEmployee();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); */

// let employee = company.next();

// while (!employee.done) {
// 	console.log(employee.value);
// 	employee = company.next();
// }

// -------------------------------------------------

// Library land
// const uid = Symbol("test");
// console.log(Symbol);

// App land

// const user = {
// 	// id: "p1",
// 	[uid]: "p1",
// 	name: "Tomi",
// 	age: 28,
// 	[Symbol.toStringTag]: "User",
// };

// // user.id = "p2";

// user[uid] = "p2";

// // console.log(user[Symbol("test")]);
// console.log(Symbol("test") === Symbol("test"));
// console.log(user);
// console.log(user.toString());
