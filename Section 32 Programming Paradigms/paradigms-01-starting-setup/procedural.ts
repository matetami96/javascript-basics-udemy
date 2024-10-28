const form = document.getElementById("user-input") as HTMLFormElement;

function signupHandler(event: SubmitEvent) {
	event.preventDefault();

	const username = document.getElementById("username") as HTMLInputElement;
	const password = document.getElementById("password") as HTMLInputElement;

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
