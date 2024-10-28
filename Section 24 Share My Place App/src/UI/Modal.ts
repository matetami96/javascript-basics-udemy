export class Modal {
	contentTemplateElement;
	modalTemplateElement;
	modalElement: HTMLDivElement | null = null;
	backdropElement: HTMLDivElement | null = null;
	constructor(public contentId: string, public fallbackText: string) {
		this.contentTemplateElement = document.getElementById(this.contentId) as HTMLTemplateElement;
		this.modalTemplateElement = document.getElementById("modal-template") as HTMLTemplateElement;
	}

	show() {
		if ("content" in document.createElement("template")) {
			const modalElements = document.importNode(this.modalTemplateElement.content, true);
			this.modalElement = modalElements.querySelector(".modal")!;
			this.backdropElement = modalElements.querySelector(".backdrop")!;
			const contentElement = document.importNode(this.contentTemplateElement.content, true);

			this.modalElement.appendChild(contentElement);
			document.body.insertAdjacentElement("afterbegin", this.modalElement);
			document.body.insertAdjacentElement("afterbegin", this.backdropElement);
		} else {
			// fallback code
			alert(this.fallbackText);
		}
	}

	hide() {
		if (this.modalElement && this.backdropElement) {
			document.body.removeChild(this.modalElement); // this.modalElement.remove();
			document.body.removeChild(this.backdropElement); // this.backdropElement.remove();
			this.modalElement = null;
			this.backdropElement = null;
		}
	}
}
