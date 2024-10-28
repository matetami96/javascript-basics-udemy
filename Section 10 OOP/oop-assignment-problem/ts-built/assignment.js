"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Course_price;
// Teacher's Solution
class Course {
    get price() {
        return "$" + __classPrivateFieldGet(this, _Course_price, "f");
    }
    set price(value) {
        if (value < 0) {
            throw "Price cannot be negative";
        }
        else {
            __classPrivateFieldSet(this, _Course_price, value, "f");
        }
    }
    constructor(title, _price, length) {
        this.title = title;
        this._price = _price;
        this.length = length;
        _Course_price.set(this, null);
        this.price = _price;
    }
    calculateValue() {
        return this.length / __classPrivateFieldGet(this, _Course_price, "f");
    }
    printSummary() {
        console.log(`Title: ${this.title}, Length: ${this.length}, Price: ${this.price}`);
    }
}
_Course_price = new WeakMap();
const jsCourse = new Course("JavaScript Full Course", 50, 44);
const reactCourse = new Course("React.js Full Course", 50, 34);
console.log(jsCourse);
console.log(reactCourse);
console.log(jsCourse.calculateValue());
console.log(reactCourse.calculateValue());
jsCourse.printSummary();
reactCourse.printSummary();
class PracticalCourse extends Course {
    constructor(title, _price, length, numOfExercises) {
        super(title, _price, length);
        this.title = title;
        this._price = _price;
        this.length = length;
        this.numOfExercises = numOfExercises;
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
