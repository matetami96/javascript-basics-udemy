import { ProjectItem as ProjItem } from "./ProjectItem.js";
import * as DomHelper from "../Utility/DomHelper.js";

const ProjectItem = "abc";

// console.log(DEFAULT_VALUE);
// console.log(this);

export class ProjectList {
	projects: ProjItem[] = [];
	switchHandler: (project: ProjItem) => void = () => {};
	constructor(public type: "active" | "finished") {
		const projectItems = document.querySelectorAll(`#${this.type}-projects li`);

		for (const projectItem of projectItems) {
			this.projects.push(new ProjItem(projectItem.id, this.switchProject.bind(this), this.type));
			this.connectDroppable();
		}
	}

	connectDroppable() {
		// console.log((window as any).DEFAULT_VALUE);
		// console.log(globalThis);
		const list = document.querySelector(`#${this.type}-projects ul`) as HTMLUListElement;

		list.addEventListener("dragenter", (event) => {
			if (event.dataTransfer!.types[0] === "text/plain") {
				list.parentElement!.classList.add("droppable");
				event.preventDefault();
			}
		});

		list.addEventListener("dragover", (event) => {
			if (event.dataTransfer!.types[0] === "text/plain") {
				event.preventDefault();
			}
		});

		list.addEventListener("dragleave", (event) => {
			if (
				(event.relatedTarget as HTMLElement)!.closest &&
				(event.relatedTarget as HTMLElement)!.closest(`#${this.type}-projects ul`) !== list
			) {
				list.parentElement!.classList.remove("droppable");
			}
		});

		list.addEventListener("drop", (event) => {
			event.preventDefault();
			const projectId = event.dataTransfer!.getData("text/plain");

			if (this.projects.find((project) => project.id === projectId)) {
				return;
			}

			(document.getElementById(projectId)!.querySelector("button:last-of-type") as HTMLButtonElement)!.click();
			list.parentElement!.classList.remove("droppable");
			// event.preventDefault(); // not required
		});
	}

	setSwitchHandlerFunction(switchHandlerFunction: (project: ProjItem) => void) {
		this.switchHandler = switchHandlerFunction;
	}

	addProject(project: ProjItem) {
		this.projects.push(project);
		DomHelper.moveElement(project.id, `#${this.type}-projects ul`);
		project.update(this.switchProject.bind(this), this.type);
	}

	switchProject(projectId: string) {
		// const projectIndex = this.projects.findIndex((project) => +project.id === projectId);
		// this.projects.splice(projectIndex, 1);
		this.switchHandler(this.projects.find((project) => project.id === projectId)!);
		this.projects = this.projects.filter((project) => project.id !== projectId);
	}
}
