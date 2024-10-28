type Post = {
	id: number;
	userId: number;
	title: string;
	body: string;
};

type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// get DOM elements
const templateElement = document.getElementById("single-post") as HTMLTemplateElement;
const listElement = document.querySelector(".posts") as HTMLUListElement;
const form = document.querySelector("#new-post form") as HTMLFormElement;
const fetchButton = document.querySelector("#available-posts button") as HTMLButtonElement;

// async function sendHttpRequest<T>(
// 	method: HttpMethods,
// 	url: string,
// 	body?: /* BodyInit | null | undefined */ unknown
// ): Promise<T> {
// 	const options = {
// 		method,
// 		body: body ? JSON.stringify(body) : null,
// 		// body: body ? body : null,
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	};
// 	const response = await fetch(url, options);

// 	if (response.ok) {
// 		return await response.json();
// 	} else {
// 		throw new Error("Something went wrong! (server side) " + JSON.stringify(response) + " Status: " + response.status);
// 	}

// 	/* return fetch(url, {
// 		method,
// 		body: body ? JSON.stringify(body) : null,
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	})
// 		.then((response) => {
// 			if (response.status >= 200 && response.status < 300) {
// 				return response.json();
// 			} else {
// 				return response.json().then((errorData) => {
// 					console.log(errorData);
// 					throw new Error(
// 						"Something went wrong! (client side) " + JSON.stringify(errorData) + " Status: " + response.status
// 					);
// 				});
// 			}
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 			throw new Error("Something went wrong!");
// 		}); */

// 	/* return new Promise((resolve, reject) => {
// 		const xhr = new XMLHttpRequest();
// 		xhr.setRequestHeader("Content-Type", "application/json");

// 		xhr.open(method, url);

// 		xhr.responseType = "json";

// 		xhr.onload = function () {
// 			if (xhr.status >= 200 && xhr.status < 300) {
// 				resolve(xhr.response as T);
// 			} else {
// 				reject(new Error("Something went wrong! " + JSON.stringify(xhr.response) + " Status: " + xhr.status));
// 			}
// 		};

// 		xhr.onerror = function () {
// 			reject(new Error("Failed to send request! " + JSON.stringify(xhr.response) + " Status: " + xhr.status));
// 		};

// 		xhr.send(JSON.stringify(body));
// 	}); */
// }

async function fetchPosts() {
	try {
		listElement.innerHTML = "";

		const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
		// console.log(response);
		// const responseData = await sendHttpRequest<Post[]>("GET", "https://jsonplaceholder.typicode.com/posts");

		for (const post of response.data) {
			const postElement = document.importNode(templateElement.content, true);
			(postElement.querySelector("h2") as HTMLHeadingElement).textContent = post.title.toUpperCase();
			(postElement.querySelector("p") as HTMLParagraphElement).textContent = post.body;
			(postElement.querySelector("li") as HTMLLIElement).id = post.id.toString();
			listElement.append(postElement);
		}
	} catch (error: any) {
		alert(error.message);
		console.log(error.response);
	}
}

async function createPost(title: string, content: string) {
	const post = {
		userId: Math.random(),
		title,
		body: content,
	};

	// const formData = new FormData(form);
	// formData.append("title", title);
	// formData.append("body", content);
	// formData.append("userId", Math.random().toString());

	// Expect a Post object in response
	try {
		/* const createdPostObj = await sendHttpRequest<{ id: number }>(
			"POST",
			"https://jsonplaceholder.typicode.com/posts",
			post
		);
		console.log("Created Post:", createdPostObj); */
		const response = await axios.post("https://jsonplaceholder.typicode.com/posts", post);
		console.log("Created Post:", response);
	} catch (error: any) {
		alert(error.message);
	}

	// const createdPostObj = await sendHttpRequest<{ id: number }>(
	// 	"POST",
	// 	"https://jsonplaceholder.typicode.com/posts",
	// 	formData
	// );
}

fetchButton.addEventListener("click", fetchPosts);

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const enteredTitle = (document.getElementById("title") as HTMLInputElement).value;
	const enteredContent = (document.getElementById("content") as HTMLInputElement).value;
	createPost(enteredTitle, enteredContent);
});

listElement.addEventListener("click", (event) => {
	if ((event.target as HTMLButtonElement)!.tagName === "BUTTON") {
		const listItem = (event.target as HTMLButtonElement)!.closest("li")!;

		try {
			/* sendHttpRequest<void>("DELETE", `https://jsonplaceholder.typicode.com/posts/${listItem.id}`).then(() => {
				listItem.remove();
			}); */
			axios.delete(`https://jsonplaceholder.typicode.com/posts/${listItem.id}`).then(() => {
				listItem.remove();
			});
		} catch (error: any) {
			alert(error.message);
		}
	}
});

/* function fetchPosts() {
	sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts").then((listOfPosts) => {
		for (const post of listOfPosts) {
			const postElement = document.importNode(templateElement.content, true);
			postElement.querySelector("h2import { axios } from 'axios';
")!.textContent = post.title.toUpperCase();
			postElement.querySelector("p")!.textContent = post.body;
			listElement.append(postElement);
		}
	});
}

fetchPosts(); */
