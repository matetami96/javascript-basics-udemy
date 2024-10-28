type LogEntry = {
	event: LogEvents;
	value: string | number;
	finalMonsterHealth: number;
	finalPlayerHealth: number;
	target?: string;
} | null;

const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 18;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 12;
const MODE_ATTACK = "ATTACK"; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK"; // MODE_STRONG_ATTACK = 1

enum LogEvents {
	LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK",
	LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK",
	LOG_EVENT_MONSER_ATTACK = "MONSER_ATTACK",
	LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL",
	LOG_EVENT_GAME_OVER = "GAME_OVER",
}
// const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK"
// const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK"
// const LOG_EVENT_MONSER_ATTACK = "MONSER_ATTACK"
// const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL"
// const LOG_EVENT_GAME_OVER = "GAME_OVER"

const enteredValue = prompt("Please choose the starting life for yourself and the monster!", "100");

let battleLog: LogEntry[] = [];
let lastLoggedEntry: number;
let chosenMaxLife: number;

function getMaxLifeValues() {
	const parsedValue = parseInt(enteredValue ?? "");

	if (isNaN(parsedValue) || parsedValue <= 0) {
		throw {
			message: "Invalid user input, not a number!",
		};
	}

	return parsedValue;
}

try {
	chosenMaxLife = getMaxLifeValues();
} catch (error) {
	console.log({ error });
	chosenMaxLife = 100;
	alert("You have entered something wrong, default value of 100 was used!");
	// throw error;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event: LogEvents, value: number | string, monsterHealth: number, playerHealth: number) {
	let logEntry: LogEntry = {
		event,
		value,
		finalMonsterHealth: monsterHealth,
		finalPlayerHealth: playerHealth,
	};

	switch (event) {
		case LogEvents.LOG_EVENT_PLAYER_ATTACK:
		case LogEvents.LOG_EVENT_PLAYER_STRONG_ATTACK:
			logEntry.target = "MONSTER";
			break;
		case LogEvents.LOG_EVENT_MONSER_ATTACK:
		case LogEvents.LOG_EVENT_PLAYER_HEAL:
			logEntry.target = "PLAYER";
			break;
		case LogEvents.LOG_EVENT_GAME_OVER:
			break;
		default:
			logEntry = null;
			break;
	}

	battleLog.push(logEntry);
}

function reset() {
	currentMonsterHealth = chosenMaxLife;
	currentPlayerHealth = chosenMaxLife;
	resetGame(chosenMaxLife);
}

function endRound() {
	const initialPlayerHealth = currentPlayerHealth;
	const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
	currentPlayerHealth -= playerDamage;
	writeToLog(LogEvents.LOG_EVENT_MONSER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

	if (currentPlayerHealth <= 0 && hasBonusLife) {
		hasBonusLife = false;
		removeBonusLife();
		currentPlayerHealth = initialPlayerHealth;
		setPlayerHealth(initialPlayerHealth);
		alert("You were lucky to have a bonus life, would be dead otherwise !!!");
	}

	if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
		alert("It's a draw!");
		writeToLog(LogEvents.LOG_EVENT_GAME_OVER, "IT'S A DRAW", currentMonsterHealth, currentPlayerHealth);
	} else if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
		alert("You won!");
		writeToLog(LogEvents.LOG_EVENT_GAME_OVER, "PLAYER WON", currentMonsterHealth, currentPlayerHealth);
	} else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
		alert("You lose!");
		writeToLog(LogEvents.LOG_EVENT_GAME_OVER, "MONSTER WON", currentMonsterHealth, currentPlayerHealth);
	}

	if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
		reset();
	}
}

function attackMonster(mode: typeof MODE_ATTACK | typeof MODE_STRONG_ATTACK) {
	const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
	const logEvent = mode === MODE_ATTACK ? LogEvents.LOG_EVENT_PLAYER_ATTACK : LogEvents.LOG_EVENT_PLAYER_STRONG_ATTACK;
	const damage = dealMonsterDamage(maxDamage);
	currentMonsterHealth -= damage;
	writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
	endRound();
}

// function attackHandler() {
// 	attackMonster(MODE_ATTACK);
// }

// function strongAttackHandler() {
// 	attackMonster(MODE_STRONG_ATTACK);
// }

function healPlayerHandler() {
	let healvalue;

	if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
		alert("You can't heal to more than your initial max health!");
		healvalue = chosenMaxLife - currentPlayerHealth;
	} else {
		healvalue = HEAL_VALUE;
	}

	increasePlayerHealth(healvalue);
	currentPlayerHealth += healvalue;
	writeToLog(LogEvents.LOG_EVENT_PLAYER_HEAL, healvalue, currentMonsterHealth, currentPlayerHealth);
	endRound();
}

function printLogHandler() {
	/* for (let i = 0; i < battleLog.length; i++) {
		const c = battleLog[i];
		console.log("----------");
		console.log(c);
	} */

	let j = 0;
	outerWhile: do {
		console.log("Outer", j);
		innerFor: for (let k = 0; k < 5; k++) {
			if (k === 3) {
				break outerWhile;
			}
			console.log("Inner", k);
		}
		j++;
	} while (j < 3);

	let i = 0;

	for (const logEntry of battleLog) {
		if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) {
			console.log(`#${i}`);
			// if (logEntry) {
			for (const key in logEntry) {
				// if (logEntry.hasOwnProperty(key)) {
				console.log(`${key} => ${(logEntry as { [key: string]: any })[key]}`);
				// }
			}
			// }
			lastLoggedEntry = i;
			break;
		}
		i++;
	}
}

attackBtn.addEventListener("click", attackMonster.bind(this, MODE_ATTACK));
strongAttackBtn.addEventListener("click", attackMonster.bind(this, MODE_STRONG_ATTACK));
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
// attackBtn.addEventListener("click", () => attackMonster("ATTACK"));
// strongAttackBtn.addEventListener("click", () => attackMonster("STRONG_ATTACK"));
