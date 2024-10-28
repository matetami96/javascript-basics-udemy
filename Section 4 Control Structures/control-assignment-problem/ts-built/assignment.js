"use strict";
/* const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)

// Task 1
if (randomNumber > 0.7) {
    alert(`The generated number ${randomNumber} is greater than 0.7!`);
}

// Task 2
const arrayOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log("Traditional for loop usage");

for (let i = 0; i < arrayOfNumbers.length; i++) {
    console.log(`Current index = ${i}, value at current index = ${arrayOfNumbers[i]} inside the FOR loop.`);
}

console.log("For of loop usage");

let i = 0;

for (const iterator of arrayOfNumbers) {
    console.log(`Current index = ${i}, value of current iteration = ${iterator} inside the FOR OF loop.`);
    i++;
}

// Task 3
console.log("Traditional for loop usage backwards");

for (let i = arrayOfNumbers.length - 1; i >= 0; i--) {
    console.log(`Current index = ${i}, value at current index = ${arrayOfNumbers[i]} inside the FOR loop.`);
}

// Task 4
const anotherRandomNumber = Math.random();

if ((randomNumber > 0.7 && anotherRandomNumber > 0.7) || randomNumber <= 0.2 || anotherRandomNumber <= 0.2) {
    console.log("randomNumber = ", randomNumber, "anotherRandomNumber = ", anotherRandomNumber);
    alert("Condition satisfied");
}
 */
// Teacher's solution
const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)
// 1
if (randomNumber > 0.7) {
    alert(`The generated number ${randomNumber} is greater than 0.7!`);
}
else {
    alert(`The generated number ${randomNumber} is NOT greater than 0.7!`);
}
// 2
const numbers = [1, 2, 3, 4, 5, 6];
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
for (const num of numbers) {
    console.log(num);
}
let counter = 0;
while (counter < numbers.length) {
    console.log(numbers[counter]);
    counter++;
}
// 3
for (let i = numbers.length - 1; i >= 0; i--) {
    console.log(numbers[i]);
}
// 4
const randomNumber2 = Math.random();
console.log(randomNumber, randomNumber2);
if ((randomNumber > 0.7 && randomNumber2 > 0.7) || randomNumber <= 0.2 || randomNumber2 <= 0.2) {
    alert("Greater than 0.7 or smaller than 0.2!");
}
