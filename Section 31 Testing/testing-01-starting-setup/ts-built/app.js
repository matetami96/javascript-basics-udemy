"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const initApp = () => {
    // Initializes the app, registers the button click listener
    const newUserButton = document.querySelector("#btnAddUser");
    newUserButton.addEventListener("click", addUser);
};
const addUser = () => {
    // Fetches the user input, creates a new HTML element based on it
    // and appends the element to the DOM
    const newUserNameInput = document.querySelector("input#name");
    const newUserAgeInput = document.querySelector("input#age");
    const outputText = (0, util_1.checkAndGenerate)(newUserNameInput.value, newUserAgeInput.value);
    if (!outputText) {
        return;
    }
    const userList = document.querySelector(".user-list");
    const element = (0, util_1.createElement)("li", outputText, "user-item");
    userList.appendChild(element);
};
// Start the app!
initApp();
