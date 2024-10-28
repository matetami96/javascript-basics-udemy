// Teacher's solution

// Task 1
const numbers = [1, -22, 100, 4, 5, 6];

const numsGreater5 = numbers.filter((val) => val > 5);
console.log(numsGreater5);

const mappedNumbers = numbers.map((val) => ({ num: val }));
console.log(mappedNumbers);

const multiplication = numbers.reduce((curResult, curValue) => curResult * curValue, 1);
console.log(multiplication);

// Task 2
// rest operator
function findMax(...nums: number[]) {
	let curMax = nums[0];
	for (const num of nums) {
		if (num > curMax) {
			curMax = num;
		}
	}
	return curMax;
}
// spread operator
console.log(findMax(...numbers));

// Task 3
function findMinMax(...nums: number[]) {
	let curMax = nums[0];
	let curMin = nums[0];
	for (const num of nums) {
		if (num > curMax) {
			curMax = num;
		}
		if (num < curMin) {
			curMin = num;
		}
	}
	return [curMin, curMax];
}

const [min, max] = findMinMax(...numbers);

console.log(min, max);

// Task 4
const userIds = new Set();
userIds.add(1);
userIds.add(-5);
userIds.add(-5);

console.log(userIds);

// My solution
/* // Task 1
const numberArray = [12, 4, 66, 33, 96, 7, 24, 40, 1, 5, 99];
console.log("Number array:", numberArray);

const numbersGreaterThan5 = numberArray.filter((num) => num > 5).sort((a, b) => a - b);
console.log("Numbers greater than 5:", numbersGreaterThan5);

const mappedArrayOfNumbers = numberArray.map((num) => ({ num })).sort((a, b) => a.num - b.num);
console.log("Mapped array of numbers:", mappedArrayOfNumbers);

const reducedMultiplication = numberArray.reduce((totalValue, currentValue) => totalValue * currentValue, 1);
console.log("Reduced multiplication:", reducedMultiplication);

// Task 2 and 3
function findMax(...args: number[]) {
	let maximum;
	let minimum;

	for (const number of args) {
		if (!maximum || number > maximum) {
			maximum = number;
		}

		if (!minimum || number < minimum) {
			minimum = number;
		}
	}

	return [minimum, maximum];
}
const [minimum, maximum] = findMax(...numberArray);
console.log("Minimum:", minimum, "Maximum:", maximum);

// Task 4
const copyOfNumberArray = [...numberArray, 5, 4, 7, 1];
const listOfUniqueValues = [...new Set(copyOfNumberArray)];
// const listOfUniqueValues = new Set(copyOfNumberArray);
console.log("List of unique values:", listOfUniqueValues);
 */
