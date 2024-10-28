var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { Tooltip } from "./Tooltip.js";
import { clearEventListeners } from "../Utility/DomHelper.js";
// console.log("ProjectItem created.");
export class ProjectItem {
    constructor(id, updateProjectListsHandler, type) {
        this.id = id;
        this.updateProjectListsHandler = updateProjectListsHandler;
        this.hasActiveTooltip = false;
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
        this.connectDrag();
    }
    showMoreInfoHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasActiveTooltip) {
                return;
            }
            const projectElement = document.getElementById(this.id);
            const tooltipText = projectElement.dataset.extraInfo;
            const module = yield import("./Tooltip.js");
            const tooltip = new module.Tooltip(() => {
                this.hasActiveTooltip = false;
            }, tooltipText, this.id);
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
        });
    }
    connectDrag() {
        const item = document.getElementById(this.id);
        item.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", this.id);
            event.dataTransfer.effectAllowed = "move";
        });
        item.addEventListener("dragend", (event) => {
            console.log(event);
        });
    }
    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfoBtn = projectItemElement.querySelector("button:first-of-type");
        moreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
    }
    connectSwitchButton(type) {
        const projectItemElement = document.getElementById(this.id);
        let switchButton = projectItemElement.querySelector("button:last-of-type");
        switchButton = clearEventListeners(switchButton);
        switchButton.textContent = type === "active" ? "Finish" : "Activate";
        switchButton.addEventListener("click", this.updateProjectListsHandler.bind(null, this.id));
    }
    update(updateProjectListsFunction, type) {
        this.updateProjectListsHandler = updateProjectListsFunction;
        this.connectSwitchButton(type);
    }
}
