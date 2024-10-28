"use strict";
// global scope
const defaultResult = 0;
// declared and initialized
let currentResult = defaultResult;
let logEntries = [];
// Gets input from input field
function getUserNumberInput() {
    return parseInt(usrInput.value);
}
// Generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalculation, calculationNumber) {
    const calcDescription = `${resultBeforeCalculation} ${operator} ${calculationNumber}`;
    outputResult(currentResult.toString(), calcDescription); // from vendor file
}
function writeToLog(
// "ADD" | "SUBTRACT" | "MULTIPLY" | "DIVIDE",
operationIdentifier, prevResult, operationNumber, newResult) {
    const logEntry = {
        operation: operationIdentifier,
        prevResult,
        number: operationNumber,
        result: newResult,
    };
    logEntries.push(logEntry);
    console.log(logEntries);
}
function calculateResult(calculationType) {
    const enteredNumber = getUserNumberInput();
    if ((calculationType != "ADD" &&
        calculationType != "SUBTRACT" &&
        calculationType != "MULTIPLY" &&
        calculationType != "DIVIDE") ||
        !enteredNumber) {
        return;
    }
    // local/block scope
    const initialResult = currentResult;
    let mathOperator;
    if (calculationType === "ADD") {
        currentResult += enteredNumber;
        mathOperator = "+";
    }
    else if (calculationType === "SUBTRACT") {
        currentResult -= enteredNumber;
        mathOperator = "-";
    }
    else if (calculationType === "MULTIPLY") {
        currentResult *= enteredNumber;
        mathOperator = "*";
    }
    else {
        currentResult /= enteredNumber;
        mathOperator = "/";
    }
    createAndWriteOutput(mathOperator, initialResult, enteredNumber);
    writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}
addBtn.addEventListener("click", calculateResult.bind(this, "ADD"));
subtractBtn.addEventListener("click", calculateResult.bind(this, "SUBTRACT"));
multiplyBtn.addEventListener("click", calculateResult.bind(this, "MULTIPLY"));
divideBtn.addEventListener("click", calculateResult.bind(this, "DIVIDE"));
// \n => line break
// let errorMessage = "An error \n \\ 'occurred!";
