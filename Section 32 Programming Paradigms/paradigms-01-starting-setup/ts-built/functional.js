"use strict";
const REQUIRED = "REQUIRED";
const MIN_LENGTH = "MIN_LENGTH";
function validate(value, flag, validatorValue) {
    if (flag === REQUIRED) {
        return value.trim().length > 0;
    }
    if (flag === MIN_LENGTH) {
        return value.trim().length > validatorValue;
    }
}
function getUserInput(inputElementId) {
    return document.getElementById(inputElementId).value;
}
function createUser(userName, userPassword) {
    if (!validate(userName, REQUIRED) || !validate(userPassword, MIN_LENGTH, 5)) {
        throw new Error("Invalid input, username or password is wrong (password must be at least 6 characters).");
    }
    return { userName, userPassword };
}
function greetUser(userName) {
    console.log("Hy I am " + userName);
}
function _signupHandler(event) {
    event.preventDefault();
    const enteredUserName = getUserInput("username");
    const enteredPassword = getUserInput("password");
    try {
        const newUser = createUser(enteredUserName, enteredPassword);
        console.log(newUser);
        greetUser(newUser.userName);
    }
    catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
}
function connectForm(formId, formSubmitHandler) {
    const form = document.getElementById(formId);
    form.addEventListener("submit", formSubmitHandler);
}
connectForm("user-input", _signupHandler);
