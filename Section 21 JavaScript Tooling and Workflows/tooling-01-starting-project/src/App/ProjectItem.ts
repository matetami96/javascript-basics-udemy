// import { Tooltip } from "./Tooltip.js";
import { clearEventListeners } from "../Utility/DomHelper";

// console.log("ProjectItem created.");

export class ProjectItem {
	hasActiveTooltip = false;

	constructor(
		public id: string,
		public updateProjectListsHandler: (projectId: string) => void,
		type: "active" | "finished"
	) {
		this.connectMoreInfoButton();
		this.connectSwitchButton(type);
		this.connectDrag();
	}

	async showMoreInfoHandler() {
		if (this.hasActiveTooltip) {
			return;
		}
		const projectElement = document.getElementById(this.id)!;
		const tooltipText = projectElement.dataset.extraInfo!;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const { Tooltip } = await import("./Tooltip");
		const tooltip = new Tooltip(
			() => {
				this.hasActiveTooltip = false;
			},
			tooltipText,
			this.id
		);
		tooltip.attach();
		this.hasActiveTooltip = true;

		// import("./Tooltip.js").then((module) => {
		// 	const tooltip = new module.Tooltip(
		// 		() => {
		// 			this.hasActiveTooltip = false;
		// 		},
		// 		tooltipText,
		// 		this.id
		// 	);
		// 	tooltip.attach();
		// 	this.hasActiveTooltip = true;
		// });
	}

	connectDrag() {
		const item = document.getElementById(this.id)!;

		item.addEventListener("dragstart", (event) => {
			event.dataTransfer!.setData("text/plain", this.id);
			event.dataTransfer!.effectAllowed = "move";
		});

		item.addEventListener("dragend", (event) => {
			console.log(event);
		});
	}

	connectMoreInfoButton() {
		const projectItemElement = document.getElementById(this.id)!;
		const moreInfoBtn = projectItemElement.querySelector("button:first-of-type") as HTMLButtonElement;
		moreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
	}

	connectSwitchButton(type: "active" | "finished") {
		const projectItemElement = document.getElementById(this.id)!;
		let switchButton = projectItemElement.querySelector("button:last-of-type") as HTMLButtonElement;
		switchButton = clearEventListeners(switchButton);
		switchButton.textContent = type === "active" ? "Finish" : "Activate";
		switchButton.addEventListener("click", this.updateProjectListsHandler.bind(null, this.id));
	}

	update(updateProjectListsFunction: (projectId: string) => void, type: "active" | "finished") {
		this.updateProjectListsHandler = updateProjectListsFunction;
		this.connectSwitchButton(type);
	}
}
