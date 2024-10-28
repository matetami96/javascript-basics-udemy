export const generateText = (name: string, age: string) => {
	// Returns output text
	return `${name} (${age} years old)`;
};

export const createElement = (type: string, text: string, className: string) => {
	// Creates a new HTML element and returns it
	const newElement = document.createElement(type);
	newElement.classList.add(className);
	newElement.textContent = text;
	return newElement;
};

const validateInput = (text: string, notEmpty: boolean, isNumber: boolean) => {
	// Validate user input with two pre-defined rules
	if (!text) {
		return false;
	}
	if (notEmpty && text.trim().length === 0) {
		return false;
	}
	if (isNumber && Number.isNaN(+text)) {
		return false;
	}
	return true;
};

export const checkAndGenerate = (name: string, age: string) => {
	if (!validateInput(name, true, false) || !validateInput(age, false, true)) {
		return false;
	}

	return generateText(name, age);
};
