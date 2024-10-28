"use strict";
// My solution
/* // Task 1
const task1 = document.querySelector("#task-1") as HTMLLIElement;
task1.style.backgroundColor = "black";

const _task1 = document.querySelector("li:first-child") as HTMLLIElement;
_task1.style.color = "white";

// Task 2
const title = document.querySelector("title") as HTMLTitleElement;
// title.textContent = "Assignment - Solved!";
const _title = document.head.querySelector("title") as HTMLTitleElement;
_title.textContent = "Assignment - Solved!";

// Task 3
const h1 = document.querySelector("h1") as HTMLHeadingElement;
h1.textContent = "Assignment - Solved!";
 */
// Teacher's solution
// Task 1
const task1El1 = document.getElementById("task-1");
const task1El2 = document.querySelector("li");
task1El1.style.color = "white";
task1El2.style.backgroundColor = "black";
// Task 2
const docTitle1 = document.querySelector("title");
// docTitle1.textContent = "Assignment - Solved!";
const docHead = document.head;
const docTitle2 = document.head.querySelector("title");
docTitle2.textContent = "Assignment - Solved!";
// Task 3
// const h1 = document.querySelector("h1") as HTMLHeadingElement;
const h1 = document.getElementsByTagName("h1");
h1[0].textContent = "Assignment - Solved!";
