const button = document.querySelector("button") as HTMLButtonElement;
const paragraph = document.querySelector("p") as HTMLParagraphElement;

button.addEventListener("click", async () => {
	const text = paragraph.textContent as string;
	const promise = new Promise(() => {});
	console.log(promise);
	// feature detection for clipboard api
	if (navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(text);
		} catch (error) {
			console.error(error);
		}
	} else {
		const selection = window.getSelection() as Selection;
		// Clear any existing selections
		selection.removeAllRanges();
		// Highlight the paragraph text
		const range = document.createRange();
		range.selectNodeContents(paragraph);
		selection.addRange(range); // Add the paragraph text to the selection
		alert("Clipboard API not supported. The text has been selected, you can copy it manually.");
	}

	/* navigator.clipboard
		.writeText(text)
		.then((result) => {
			console.log(result);
		})
		.catch((error) => {
			console.error(error);
		}); */
});
