// const _name = "Tomi";
// let hobbies: string[] = [];

// if (_name === "Tomi") {
// 	hobbies = ["Sports", "Cooking"];
// 	console.log(hobbies);
// }

// function greet() {
// 	var age = 27;
// 	var _name = "Emochi";
// 	console.log(_name, age, hobbies);
// }

// console.log(_name, hobbies);

// greet();

// var userName = "Tomi";

// console.log(userName);

// function getName() {
// 	return prompt("Your name: ", "");
// }

// function greet() {
// 	const userName = getName();
// 	console.log("Hello " + userName);
// }

// greet();

const addListenerBtn = document.getElementById("add-listener-btn") as HTMLButtonElement;
const clickableBtn = document.getElementById("clickable-btn") as HTMLButtonElement;
const messageInput = document.getElementById("click-message-input") as HTMLInputElement;

function printMessage() {
	const value = messageInput.value;
	console.log(value || "Clicked me!");
}

function addListener() {
	clickableBtn.addEventListener("click", printMessage);
}

addListenerBtn.addEventListener("click", addListener);
