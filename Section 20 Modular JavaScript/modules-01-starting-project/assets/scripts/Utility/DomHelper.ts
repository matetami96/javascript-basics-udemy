// console.log("DomHelper executing.");

export const clearEventListeners = (element: HTMLButtonElement) => {
	const clonedElement = element.cloneNode(true) as HTMLButtonElement;
	element.replaceWith(clonedElement);
	return clonedElement;
};

export const moveElement = (elementId: string, newDestinationSelector: string) => {
	const element = document.getElementById(elementId)!;
	const destinationElement = document.querySelector(newDestinationSelector)!;
	destinationElement.append(element);
	element.scrollIntoView({ behavior: "smooth" });
};

export class DOMHelper {
	static clearEventListeners(element: HTMLButtonElement) {
		const clonedElement = element.cloneNode(true) as HTMLButtonElement;
		element.replaceWith(clonedElement);
		return clonedElement;
	}

	static moveElement(elementId: string, newDestinationSelector: string) {
		const element = document.getElementById(elementId)!;
		const destinationElement = document.querySelector(newDestinationSelector)!;
		destinationElement.append(element);
		element.scrollIntoView({ behavior: "smooth" });
	}
}
