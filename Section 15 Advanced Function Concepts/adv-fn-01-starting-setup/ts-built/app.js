"use strict";
// pure function
// produces same result given same input
function add(num1, num2) {
    return num1 + num2;
}
console.log(add(1, 5)); // 6
console.log(add(12, 15)); // 27
// impure function
// produces different results every time because of Math.random
function addRandom(num1) {
    return num1 + Math.random();
}
console.log(addRandom(5));
// impure function
// we introduce a side effect by setting the previousResult variable
// that is outside of the function
let previousResult = 0;
function addMoreNumbers(num1, num2) {
    const sum = num1 + num2;
    previousResult = sum;
    return sum;
}
console.log(addMoreNumbers(1, 5));
// impure function
// we introduce a side effect by using pushing to an array
// inside the function
const hobbies = ["Sports", "Cooking"];
function printHobbies(hobbies) {
    hobbies.push("Hiking");
    console.log(hobbies);
}
printHobbies(hobbies);
let multiplier = 1.1;
// factory function
// returns a function with a pre configured parameter
// 'tax' in this example
function createTaxCalculator(tax) {
    function calculateTax(amount) {
        console.log(multiplier);
        return amount * tax * multiplier;
    }
    return calculateTax;
}
const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);
// multiplier = 1.2;
console.log("VAT", calculateVatAmount(100));
console.log("VAT", calculateVatAmount(200));
console.log("Income Tax", calculateIncomeTaxAmount(200));
let userNamne = "Tomi";
function greetUser() {
    // let _name = "Bea";
    console.log("Hy " + _name);
}
let _name = "Zsolti";
userNamne = "Emoke";
greetUser();
// function powerOf(x: number, n: number) {
// 	let result = 1;
// 	for (let i = 0; i < n; i++) {
// 		result *= x;
// 	}
// 	return result;
// }
function powerOf(x, n) {
    // if (n === 1) {
    // 	return x;
    // }
    // return x * powerOf(x, n - 1);
    return n === 1 ? x : x * powerOf(x, n - 1);
}
console.log("Result =", powerOf(2, 3)); // 8
const myself = {
    name: "Tomi",
    friends: [
        {
            name: "Moci",
            friends: [
                {
                    name: "Zsolt",
                    friends: [
                        {
                            name: "Szabi",
                        },
                        {
                            name: "Norbi",
                        },
                    ],
                },
            ],
        },
        {
            name: "Bea",
        },
    ],
};
function getFriendNames(person) {
    const collectedNames = [];
    if (!person.friends) {
        return [];
    }
    for (const friend of person.friends) {
        collectedNames.push(friend.name);
        collectedNames.push(...getFriendNames(friend));
    }
    return collectedNames;
}
console.log(getFriendNames(myself));
