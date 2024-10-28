const REQUIRED = "REQUIRED";
const MIN_LENGTH = "MIN_LENGTH";

function validate(value: string, flag: "REQUIRED" | "MIN_LENGTH", validatorValue?: number) {
	if (flag === REQUIRED) {
		return value.trim().length > 0;
	}

	if (flag === MIN_LENGTH) {
		return value.trim().length > validatorValue!;
	}
}

function getUserInput(inputElementId: string) {
	return (document.getElementById(inputElementId) as HTMLInputElement).value;
}

function createUser(userName: string, userPassword: string) {
	if (!validate(userName, REQUIRED) || !validate(userPassword, MIN_LENGTH, 5)) {
		throw new Error("Invalid input, username or password is wrong (password must be at least 6 characters).");
	}

	return { userName, userPassword };
}

function greetUser(userName: string) {
	console.log("Hy I am " + userName);
}

function _signupHandler(event: SubmitEvent) {
	event.preventDefault();

	const enteredUserName = getUserInput("username");
	const enteredPassword = getUserInput("password");

	try {
		const newUser = createUser(enteredUserName, enteredPassword);
		console.log(newUser);
		greetUser(newUser.userName);
	} catch (error) {
		if (error instanceof Error) {
			alert(error.message);
		}
	}
}

function connectForm(formId: string, formSubmitHandler: (event: SubmitEvent) => void) {
	const form = document.getElementById(formId) as HTMLFormElement;
	form.addEventListener("submit", formSubmitHandler);
}

connectForm("user-input", _signupHandler);
