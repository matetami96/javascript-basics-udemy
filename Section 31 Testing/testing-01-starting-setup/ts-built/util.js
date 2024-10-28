"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndGenerate = exports.createElement = exports.generateText = void 0;
const generateText = (name, age) => {
    // Returns output text
    return `${name} (${age} years old)`;
};
exports.generateText = generateText;
const createElement = (type, text, className) => {
    // Creates a new HTML element and returns it
    const newElement = document.createElement(type);
    newElement.classList.add(className);
    newElement.textContent = text;
    return newElement;
};
exports.createElement = createElement;
const validateInput = (text, notEmpty, isNumber) => {
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
const checkAndGenerate = (name, age) => {
    if (!validateInput(name, true, false) || !validateInput(age, false, true)) {
        return false;
    }
    return (0, exports.generateText)(name, age);
};
exports.checkAndGenerate = checkAndGenerate;
