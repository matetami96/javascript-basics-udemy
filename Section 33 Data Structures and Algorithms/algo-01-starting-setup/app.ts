//  data structures

const ages = [12, 14, 16, 18, 20];

ages.push(22); // Constant Time Complexity: O(1)
ages.unshift(10); // Linear Time Complexity: O(n)

const myAge = ages[1]; // Constant Time Complexity: O(1)

const namePopularity = [
	{
		name: "Tomi",
		usages: 5,
	},
	{
		name: "Emoke",
		usages: 6,
	},
];
const mociUsages = namePopularity.find((person) => person.name === "Emoke")!.usages;
// best case constant time complexity O(1)
// worst case linear time complexity O(n)
// average case linear time complexity O(n)

const nameMap = {
	Tomi: 5,
	Emoke: 6,
};

const mociUsages2 = nameMap["Emoke"]; // Constant Time Complexity: O(1)

/* // sum array

const array = [1, 2, 3];

const sumArray = (array: number[]) => {
	let sum = 0;

	for (let i = 0; i < array.length; i++) {
		sum += array[i];
	}

	return sum;
};

// T = n => Linear Time Complexity: O(n)
console.log(sumArray(array)); */

/* // decide if odd or even

const isEvenOrOdd = (number: number) => {
	return number % 2 === 0 ? "Even" : "Odd";
	// const result = number % 2;
	// if (result === 0) {
	// 	return "Even";
	// }
	// return "Odd";
};

// T = 1 => Constant Time Complexity: O(1)

console.log(isEvenOrOdd(10)); // Even
console.log(isEvenOrOdd(11)); // Odd */

/* // get the minimum from the list
const numberArray = [5, 1, 5];

// best case: [5] => O(1)
// worst case: [5, 1, 5] => O(n)
const getMinimum = (array: number[]) => {
	if (!array.length) {
		throw new Error("Empty array provided!");
	}

	let currentMinimum = array[0];

	for (let i = 1; i < array.length; i++) {
		if (array[i] < currentMinimum) {
			// n times
			currentMinimum = array[i];
		}
	}

	return currentMinimum;
};

// T = n => Linear Time Complexity: O(n)

// best case: [1, 2, 3] => O(n^2)
// worst case: [3, 2, 1] => O(n^2)
// average case: [?, ?, ?] => O(n^2)
const getMinimum2 = (array: number[]) => {
	if (!array.length) {
		throw new Error("Empty array provided!");
	}

	for (let i = 0; i < array.length; i++) {
		let outerElement = array[i]; // n times
		for (let j = i + 1; j < array.length; j++) {
			let innerElement = array[j]; // n times

			if (outerElement > innerElement) {
				// swap
				array[i] = innerElement;
				array[j] = outerElement;
				outerElement = array[i];
				innerElement = array[j];
			}
		}
	}

	return array[0];
};

// T = n * n => Quadratic Time Complexity: O(n^2)

// console.log(getMinimum(numberArray));
console.log(getMinimum2(numberArray));
 */
