const button = document.querySelector("button")!;

// button.onclick = function() {}

const buttonClickHandler = (event: Event) => {
	// (event.target as HTMLButtonElement).disabled = true;
	console.log("event:", event);
};

const anotherButtonClickHandler = () => {
	console.log("This was clicked!");
};

// buttons.forEach((button) => {
// 	button.addEventListener("mouseenter", buttonClickHandler);
// });

let curElementNumber = 0;

function infiniteScrollHandler() {
	const distanceToBottom = document.body.getBoundingClientRect().bottom;

	if (distanceToBottom < document.documentElement.clientHeight + 150) {
		const newDataElement = document.createElement("div");
		curElementNumber++;
		newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
		document.body.append(newDataElement);
	}
}

const form = document.querySelector("form")!;

form.addEventListener("submit", (event) => {
	event.preventDefault();
	console.log(event);
});

const div = document.querySelector("div")!;

div.addEventListener(
	"click",
	(event) => {
		console.log("Clicked on div", event);
	} /* ,
	true */
);

button.addEventListener("click", function (event) {
	event.stopPropagation();
	console.log("Clicked on button", event);
	console.log(this);
});

const listItems = document.querySelectorAll("li");
const list = document.querySelector("ul")!;

list.addEventListener("click", function (event) {
	// console.log(event.currentTarget);
	// (event.target as HTMLUListElement).classList.toggle("highlight");
	(event.target as HTMLElement).closest("li")!.classList.toggle("highlight");
	// form.submit();
	button.click();
	console.log(this);
});

// listItems.forEach((listItem) => {
// 	listItem.addEventListener("click", (event) => {
// 		(event.target as HTMLUListElement).classList.toggle("highlight");
// 	});
// });

// window.addEventListener("scroll", infiniteScrollHandler);

// window.addEventListener("scroll", (event) => {
// 	console.log("scroll", event);
// });

// const boundFn = buttonClickHandler.bind(this);

// const _buttonClickHandler = () => {
// 	buttonClickHandler();
// 	anotherButtonClickHandler();
// };

// button.onclick = buttonClickHandler;
// button.onclick = anotherButtonClickHandler;

// button.addEventListener("click", buttonClickHandler /* _buttonClickHandler */);

// setTimeout(() => {
// 	button.removeEventListener("click", buttonClickHandler /* _buttonClickHandler */);
// }, 2000);
