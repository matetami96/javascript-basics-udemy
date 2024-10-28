"use strict";
const task3Element = document.getElementById("task-3");
// // Task 1
// const greeter = () => alert("Hello!");
// const advancedGreeter = (name: string) => alert("Hello " + name);
// // Task 2
// greeter();
// advancedGreeter("Tomi");
// // Task 3
// task3Element.addEventListener("click", greeter);
// // Task 4
// const getFullName = (firstName: string, middleName: string, lastName: string) =>
// 	`${lastName} ${firstName} ${middleName}`;
// // Task 5
// alert(getFullName("Istvan", "Csaba", "Mate"));
// Teacher's solution
function greet() {
    alert("Hi there!");
}
function greetUser(userName) {
    alert("Hi " + userName);
}
function combine(str1, str2, str3) {
    const combinedText = `${str1} ${str2} ${str3}`;
    return combinedText;
}
greetUser("Max");
task3Element.addEventListener("click", greet);
const combinedString = combine("Hi", "there", "!");
alert(combinedString);
