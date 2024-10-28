const usrInput = document.getElementById("input-number")! as HTMLInputElement;
const addBtn = document.getElementById("btn-add")! as HTMLButtonElement;
const subtractBtn = document.getElementById("btn-subtract")! as HTMLButtonElement;
const multiplyBtn = document.getElementById("btn-multiply")! as HTMLButtonElement;
const divideBtn = document.getElementById("btn-divide")! as HTMLButtonElement;

const currentResultOutput = document.getElementById("current-result")!;
const currentCalculationOutput = document.getElementById("current-calculation")!;

function outputResult(result: string, text: string) {
	currentResultOutput.textContent = result;
	currentCalculationOutput.textContent = text;
}
