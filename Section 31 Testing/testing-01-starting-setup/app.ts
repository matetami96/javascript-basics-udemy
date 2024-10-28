import { createElement, checkAndGenerate } from "./util";

const initApp = () => {
	// Initializes the app, registers the button click listener
	const newUserButton = document.querySelector("#btnAddUser") as HTMLButtonElement;
	newUserButton.addEventListener("click", addUser);
};

const addUser = () => {
	// Fetches the user input, creates a new HTML element based on it
	// and appends the element to the DOM
	const newUserNameInput = document.querySelector("input#name") as HTMLInputElement;
	const newUserAgeInput = document.querySelector("input#age") as HTMLInputElement;
	const outputText = checkAndGenerate(newUserNameInput.value, newUserAgeInput.value)!;

	if (!outputText) {
		return;
	}

	const userList = document.querySelector(".user-list") as HTMLUListElement;
	const element = createElement("li", outputText, "user-item");
	userList.appendChild(element);
};

// Start the app!
initApp();
