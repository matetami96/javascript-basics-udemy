"use strict";
const ul = document.body.firstElementChild.nextElementSibling;
const firstLi = ul.firstElementChild;
console.log(firstLi);
const section = document.querySelector("section");
const button = document.querySelector("button");
// section.style.backgroundColor = "blue";
section.className = "red-bg";
button.addEventListener("click", () => {
    /* if (section.className === "red-bg visible") {
        section.className = "red-bg invisible";
    } else {
        section.className = "red-bg visible";
    } */
    // section.classList.toggle("visible");
    section.classList.toggle("invisible");
});
/* const h1 = document.getElementById("main-title") as HTMLHeadingElement;

h1.textContent = "DOM Interaction";
h1.style.color = "blue";
h1.style.backgroundColor = "yellow";

const li = document.querySelector("li:last-of-type") as HTMLLIElement;
li.textContent = li.textContent + " - I was changed dynamically!";

const body = document.body;

const listItemElements = document.querySelectorAll("li"); // gives back non-live list of elements
// const listItemElements = document.getElementsByTagName("li"); // gives back live list of elements

for (const listItemElement of listItemElements) {
    console.dir(listItemElement);
}
 */
