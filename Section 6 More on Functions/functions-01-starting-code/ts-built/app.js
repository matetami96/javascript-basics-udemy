"use strict";
const startGameBtn = document.getElementById("start-game-btn");
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";
const DEFAULT_USER_CHOICE = ROCK;
let gameIsRunning = false;
const getPlayerChoice = () => {
    var _a;
    const selection = (_a = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?}`, "")) === null || _a === void 0 ? void 0 : _a.toUpperCase();
    if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
        alert(`Invalid choice! We have chosen ${DEFAULT_USER_CHOICE} for you!`);
        return;
        // return DEFAULT_USER_CHOICE;
    }
    return selection;
};
const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return ROCK;
    }
    else if (randomValue < 0.67) {
        return PAPER;
    }
    else {
        return SCISSORS;
    }
};
const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) => cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
        (cChoice === PAPER && pChoice === SCISSORS) ||
        (cChoice === SCISSORS && pChoice === ROCK)
        ? RESULT_PLAYER_WINS
        : RESULT_COMPUTER_WINS;
/* const getWinner = (cChoice: string, pChoice: string) => {
    return cChoice === pChoice
        ? RESULT_DRAW
        : (cChoice === ROCK && pChoice === PAPER) ||
          (cChoice === PAPER && pChoice === SCISSORS) ||
          (cChoice === SCISSORS && pChoice === ROCK)
        ? RESULT_PLAYER_WINS
        : RESULT_COMPUTER_WINS;

    // if (cChoice === pChoice) {
    // 	return RESULT_DRAW;
    // } else if (
    // 	(cChoice === ROCK && pChoice === PAPER) ||
    // 	(cChoice === PAPER && pChoice === SCISSORS) ||
    // 	(cChoice === SCISSORS && pChoice === ROCK)
    // ) {
    // 	return RESULT_PLAYER_WINS;
    // } else {
    // 	return RESULT_COMPUTER_WINS;
    // }
}; */
startGameBtn.addEventListener("click", () => {
    if (gameIsRunning) {
        return;
    }
    gameIsRunning = true;
    console.log("Game is starting...");
    const playerChoice = getPlayerChoice(); // might yield undefined !!!
    const computerChoice = getComputerChoice();
    let winner;
    if (playerChoice) {
        winner = getWinner(computerChoice, playerChoice);
    }
    else {
        winner = getWinner(computerChoice);
    }
    let message = `You picked ${playerChoice || DEFAULT_USER_CHOICE}, computer picked ${computerChoice}, `;
    if (winner === RESULT_DRAW) {
        message = message + "it is a draw!";
    }
    else if (winner === RESULT_PLAYER_WINS) {
        message = message + "you have won!";
    }
    else {
        message = message + "you have lost!";
    }
    alert(message);
    gameIsRunning = false;
});
// not related to the game
// const combine = (resultHandler: (number: number) => void, operation: string, ...numbers: any[]) => {
// 	const validateNumber = (num: number) => {
// 		return isNaN(num) ? 0 : num;
// 	};
// 	let sum = 0;
// 	for (const number of numbers) {
// 		if (operation === "ADD") {
// 			sum += validateNumber(number);
// 		} else {
// 			sum -= validateNumber(number);
// 		}
// 	}
// 	// calling the callback
// 	resultHandler(sum);
// };
// /* const subtractUp = function (resultHandler: (number: number) => void, ...args: any[]) {
// 	let sum = 0;
// 	for (const arg of args) {
// 		sum -= arg;
// 	}
// 	resultHandler(sum);
// }; */
// // callback
// const showResult = (messageText: string, result: number) => {
// 	alert(messageText + " " + result);
// };
// // passing the callback
// combine(showResult.bind(this, "The result after adding all numbers is:"), "ADD", 1, 2, 3, 4, 5);
// combine(showResult.bind(this, "The result after adding all numbers is:"), "ADD", 20, -3, 64, 50);
// combine(showResult.bind(this, "The result after subtacting all numbers is:"), "SUBTRACT", 1, 2, 3, 4, 5);
