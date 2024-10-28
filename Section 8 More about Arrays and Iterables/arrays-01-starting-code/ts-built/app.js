"use strict";
let person = { name: "Tomi" };
const persons = new WeakSet();
persons.add(person);
// some operation
// person = null;
console.log("persons ", persons);
const personData = new WeakMap();
personData.set(person, "Extra Data");
person = null;
console.log("personData ", personData);
// const person1 = { name: "Tomi" };
// const person2 = { name: "Emoci" };
// const personData = new Map([[person1, [{ date: "2021-01-01", price: 89 }]]]);
// personData.set(person2, [{ date: "2021-02-03", price: 120 }]);
// console.log("personData ", personData);
// console.log(personData.get(person1));
// for (const [key, value] of personData.entries()) {
// 	console.log("key ", key, "value", value);
// }
// for (const key of personData.keys()) {
// 	console.log("key ", key);
// }
// for (const value of personData.values()) {
// 	console.log("value", value);
// }
// console.log("personData.size ", personData.size);
// const ids: Set<string | number> = new Set(["Hy", "from", "Set"]);
// console.log("ids ", ids);
// ids.add(2);
// if (ids.has("Hy")) {
// 	ids.delete("Hy");
// }
// console.log("ids.has(1) ", ids.has(2), "ids.size ", ids.size);
// for (const entry of ids.entries()) {
// 	console.log("entry ", entry[0]);
// }
// const nameFragments = ["Tomi", "Mate", "Mr", 27];
// const [firstName, lastName, ...otherInformation] = nameFragments;
// console.log("firstName: ", firstName, "lastName: ", lastName, "otherInformation: ", otherInformation);
// const prices = [9.99, 1.5, 19.99, 7.77, 3.14, 9.99];
// const tax = 0.19;
// const taxAdjustedPrices = prices.map((price, index, prices) => {
// 	const priceObject = { index, taxAdjustedPrices: price * (1 + tax) };
// 	return priceObject;
// });
// const sortedArray = [...prices].sort((a, b) => {
// 	// return a - b
// 	if (a > b) {
// 		return 1;
// 	} else if (a === b) {
// 		return 0;
// 	}
// 	return -1;
// 	// return b - a
// 	/* if (a > b) {
// 		return -1;
// 	} else if (a === b) {
// 		return 0;
// 	}
// 	return 1; */
// });
// console.log("sortedArray ", sortedArray);
// // console.log("sortedArray ", sortedArray.reverse());
// const filteredArray = prices.filter((price) => price > 9);
// console.log("filteredArray ", filteredArray);
// const sum = prices.reduce((accumulatedSum, currentPrice) => accumulatedSum + currentPrice, 0);
// console.log("sum ", sum);
// const data = "new york;10.99;2000";
// const transformedData = data.split(";");
// console.log("transformedData ", transformedData);
// const nameFragments = ["Tomi", "Mate"];
// const fullName = nameFragments.join(" ");
// console.log("fullName ", fullName);
// const copiedNameFragments = [...nameFragments];
// nameFragments.push("Moci");
// console.log("nameFragments ", nameFragments, "copiedNameFragments ", copiedNameFragments);
// console.log(Math.min(...prices));
// const persons = [
// 	{ name: "Tomi", age: 17 },
// 	{ name: "Moci", age: 21 },
// 	{ name: "Bea", age: 27 },
// ];
// const copiedPersons = persons.map((person) => ({ ...person }));
// persons.push({ name: "Mara", age: 19 });
// persons[0].age = 18;
// console.log("persons ", persons, "copiedPersons ", copiedPersons);
// let sum = 0;
// for (const price of prices) {
// 	sum += price;
// }
// console.log("sum ", sum);
// console.log("prices ", prices, "taxAdjustedPrices ", taxAdjustedPrices);
// const prices = [9.99, 1.5, 19.99, 7.77, 3.14, 9.99];
// const tax = 0.19;
// const taxAdjustedPrices: { index: number; taxAdjustedPrices: number }[] = [];
// // for (const price of prices) {
// // 	taxAdjustedPrices.push(price * (1 + tax));
// // }
// prices.forEach((price, index, prices) => {
// 	const priceObject = {
// 		index,
// 		taxAdjustedPrices: price * (1 + tax),
// 	};
// 	taxAdjustedPrices.push(priceObject);
// });
// console.log("taxAdjustedPrices ", taxAdjustedPrices);
// const testResults = [1, 5.3, 1.5, 10.99, 1.5, -5, 10];
// // const storedResults = testResults.slice(2);
// const storedResults = testResults.concat([3.99, 2]);
// testResults.push(5.91);
// console.log("testResults ", testResults);
// console.log("storedResults ", storedResults);
// console.log("indexOf 1.5", testResults.indexOf(1.5));
// console.log("lastIndexOf 1.5", testResults.lastIndexOf(1.5));
// console.log(testResults.includes(1.5));
// const personData = [{ name: "Tomi" }, { name: "Emoji" }];
// const emoji = personData.find((person) => person.name === "Emoji");
// emoji!.name = "Bea";
// console.log(emoji, personData);
// const tomIndex = personData.findIndex((person) => person.name === "Tomi");
// console.log("tomIndex ", tomIndex);
// const hobbies = ["Cooking", "Sports"];
// hobbies.push("Reading");
// hobbies.unshift("Coding");
// hobbies.pop();
// hobbies.shift();
// console.log("hobbies ", hobbies);
// hobbies[1] = "Coding";
// // hobbies[5] = "Reading"; // rarely used
// console.log("hobbies ", hobbies);
// hobbies.splice(1, 0, "Travelling");
// console.log("hobbies ", hobbies);
// const removedElements = hobbies.splice(-2, 1);
// console.log("hobbies ", hobbies);
// const hobbies = ["Cooking", "Sports"];
// const personalData = [30, "Tomi", { moreDetail: {} }];
// console.log("personalData ", personalData);
// const analyticsData = [
// 	[1, 1.6],
// 	[-5.4, 2.1],
// ];
// console.log("analyticsData ", analyticsData);
// for (const data of analyticsData) {
// 	for (const dataPoints of data) {
// 		console.log("dataPoints ", dataPoints);
// 	}
// }
// console.log(personalData[1]);
// const numbers = [1, 2, 3];
// console.log("numbers ", numbers);
// // const moreNumbers = new Array(5); // empty array with fixed length
// // // const moreNumbers = Array(5); // empty array with fixed length
// // console.log("moreNumbers ", moreNumbers);
// // const yetMoreNumbers = Array.of(1, 2, 3);
// // console.log("yetMoreNumbers ", yetMoreNumbers);
// const listItems = document.querySelectorAll("li");
// console.log("listItems ", listItems);
// const arrayListItems = Array.from(listItems);
// console.log("arrayListItems ", arrayListItems);
