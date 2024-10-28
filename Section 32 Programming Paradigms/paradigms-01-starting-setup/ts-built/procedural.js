"use strict";
const form = document.getElementById("user-input");
function signupHandler(event) {
    event.preventDefault();
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    if (username.value.trim().length === 0) {
        alert("Invalid input - please enter a valid username");
        return;
    }
    if (password.value.trim().length <= 5) {
        alert("Invalid input - password must be at least 6 characters long");
        return;
    }
    const user = { username: username.value, password: password.value };
    console.log(user);
    console.log("Hy I am " + user.username);
}
form.addEventListener("submit", signupHandler);
