const button = document.querySelector("button") as HTMLButtonElement;
const output = document.querySelector("p") as HTMLParagraphElement;

// Define a more specific interface for options to ensure type safety
interface GeoOptions {
	[key: string]: string | number | boolean;
}

// Use GeolocationPositionError as a return type for rejected promises
const getPosition = (options?: GeoOptions) => {
	return new Promise<GeolocationPosition>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(success: GeolocationPosition) => resolve(success),
			(error: GeolocationPositionError) => reject(error), // Properly typed rejection
			options
		);
	});
};

// Define a function with a specific return type for the timer promise
const setTimer = (duration: number) => {
	return new Promise<string>((resolve) => {
		setTimeout(() => resolve("Done!"), duration);
	});
};

// Use async/await and proper typing for the handler
async function trackUserHandler() {
	// Explicitly define the types of variables
	let posData: GeolocationPosition | undefined;
	let timerData: string | undefined;

	try {
		posData = await getPosition(); // Awaiting the geolocation data
		timerData = await setTimer(2000); // Awaiting the timer to finish
	} catch (error) {
		if (error instanceof GeolocationPositionError) {
			console.log(`Geolocation error: ${error.message}`);
		} else {
			console.log(`Other error: ${error}`);
		}
	}

	// Ensure both values are printed correctly even if there's an error
	console.log(timerData, posData);

	// Using a timer to log additional data after a delay
	setTimer(1000).then(() => {
		console.log("Timer done!");
	});

	console.log("Getting location...");
}

// Event listener for the button
button.addEventListener("click", trackUserHandler);

// Using Promise.allSettled for handling multiple promises and typing the result
Promise.allSettled([getPosition(), setTimer(1000)]).then(
	(promiseData: PromiseSettledResult<GeolocationPosition | string>[]) => {
		console.log(promiseData);
	}
);

/*
// Alternative using Promise.all for handling multiple promises, all must resolve
Promise.all([getPosition(), setTimer(1000)]).then((promiseData: [GeolocationPosition, string]) => {
	console.log(promiseData);
});

// Alternative using Promise.race for returning the first settled promise
Promise.race([getPosition(), setTimer(1000)]).then((data: GeolocationPosition | string) => {
	console.log(data);
});
*/

/* Performance testing (not directly related to async/await or promises)
let result = 0;

for (let i = 0; i < 100000000; i++) {
	result += i;
}

console.log(result);
*/

// const button = document.querySelector("button") as HTMLButtonElement;
// const output = document.querySelector("p") as HTMLParagraphElement;

// const getPosition = (options?: {
// 	[key: string]: string | number | boolean;
// }): Promise<GeolocationPosition | GeolocationPositionError> => {
// 	const promise: Promise<GeolocationPosition | GeolocationPositionError> = new Promise((resolve, reject) => {
// 		navigator.geolocation.getCurrentPosition(
// 			(success) => {
// 				resolve(success);
// 			},
// 			(error) => {
// 				reject(error);
// 			},
// 			options
// 		);
// 	});

// 	return promise;
// };

// const setTimer = (duration: number): Promise<string> => {
// 	const promise: Promise<string> = new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve("Done!");
// 		}, duration);
// 	});

// 	return promise;
// };

// async function trackUserHandler() {
// 	// let positionData: GeolocationPosition;
// 	let posData;
// 	let timerData;

// 	try {
// 		posData = await getPosition();
// 		timerData = await setTimer(2000);
// 	} catch (error) {
// 		console.log(error);
// 	}

// 	console.log(timerData, posData);
// 	// getPosition()
// 	// .then((posData) => {
// 	// 	positionData = posData as GeolocationPosition;
// 	// 	return setTimer(2000);
// 	// })
// 	// .catch((error: GeolocationPositionError) => {
// 	// 	console.log(error);
// 	// 	return "on we go";
// 	// })
// 	// .then((data) => {
// 	// 	console.log(data, positionData);
// 	// });
// 	setTimer(1000).then(() => {
// 		console.log("Timer done!");
// 	});
// 	console.log("Getting location...");
// }

// button.addEventListener("click", trackUserHandler);

// Promise.allSettled([getPosition(), setTimer(1000)]).then((promiseData) => {
// 	console.log(promiseData);
// });

// // Promise.all([getPosition(), setTimer(1000)]).then((promiseData) => {
// // 	console.log(promiseData);
// // });

// // Promise.race([getPosition(), setTimer(1000)]).then((data) => {
// // 	console.log(data);
// // });

// /* let result = 0;

// for (let i = 0; i < 100000000; i++) {
// 	result += i;
// }

// console.log(result); */
