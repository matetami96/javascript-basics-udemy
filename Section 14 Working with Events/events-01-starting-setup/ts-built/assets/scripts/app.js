"use strict";
class DOMHelper {
    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }
    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(element);
        element.scrollIntoView({ behavior: "smooth" });
    }
}
class Component {
    constructor(hostElementId, insertBefore = false) {
        this.insertBefore = false;
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        }
        else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;
    }
    detach() {
        if (this.element) {
            this.element.remove();
            // this.element.parentElement.removeChild(this.element);
        }
    }
    attach() {
        this.hostElement.insertAdjacentElement(this.insertBefore ? "afterbegin" : "beforeend", this.element);
    }
}
class Tooltip extends Component {
    constructor(closeNotifier, tooltipText, hostElementId) {
        super(hostElementId);
        this.closeNotifier = closeNotifier;
        this.tooltipText = tooltipText;
        this.closeTooltip = () => {
            this.detach();
            this.closeNotifier();
        };
        this.create();
    }
    create() {
        const tooltipElement = document.createElement("div");
        tooltipElement.className = "card";
        const tooltipTemplate = document.getElementById("tooltip");
        const tooltipBody = document.importNode(tooltipTemplate.content, true);
        tooltipBody.querySelector("p").textContent = this.tooltipText;
        tooltipElement.append(tooltipBody);
        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPosTop = this.hostElement.offsetTop;
        const hostElHeight = this.hostElement.clientHeight;
        const parentElementScrolling = this.hostElement.parentElement.scrollTop;
        const x = hostElPosLeft + 20;
        const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;
        tooltipElement.style.position = "absolute";
        tooltipElement.style.left = x + "px"; // 500px
        tooltipElement.style.top = y + "px";
        tooltipElement.addEventListener("click", this.closeTooltip);
        this.element = tooltipElement;
    }
}
class ProjectItem {
    constructor(id, updateProjectListsHandler, type) {
        this.id = id;
        this.updateProjectListsHandler = updateProjectListsHandler;
        this.hasActiveTooltip = false;
        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
        this.connectDrag();
    }
    showMoreInfoHandler() {
        if (this.hasActiveTooltip) {
            return;
        }
        const projectElement = document.getElementById(this.id);
        const tooltipText = projectElement.dataset.extraInfo;
        const tooltip = new Tooltip(() => {
            this.hasActiveTooltip = false;
        }, tooltipText, this.id);
        tooltip.attach();
        this.hasActiveTooltip = true;
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
        switchButton = DOMHelper.clearEventListeners(switchButton);
        switchButton.textContent = type === "active" ? "Finish" : "Activate";
        switchButton.addEventListener("click", this.updateProjectListsHandler.bind(null, this.id));
    }
    update(updateProjectListsFunction, type) {
        this.updateProjectListsHandler = updateProjectListsFunction;
        this.connectSwitchButton(type);
    }
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.projects = [];
        this.switchHandler = () => { };
        const projectItems = document.querySelectorAll(`#${this.type}-projects li`);
        for (const projectItem of projectItems) {
            this.projects.push(new ProjectItem(projectItem.id, this.switchProject.bind(this), this.type));
            this.connectDropable();
        }
    }
    connectDropable() {
        const list = document.querySelector(`#${this.type}-projects ul`);
        list.addEventListener("dragenter", (event) => {
            if (event.dataTransfer.types[0] === "text/plain") {
                list.parentElement.classList.add("droppable");
                event.preventDefault();
            }
        });
        list.addEventListener("dragover", (event) => {
            if (event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
            }
        });
        list.addEventListener("dragleave", (event) => {
            if (event.relatedTarget.closest &&
                event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
                list.parentElement.classList.remove("droppable");
            }
        });
        list.addEventListener("drop", (event) => {
            event.preventDefault();
            const projectId = event.dataTransfer.getData("text/plain");
            if (this.projects.find((project) => project.id === projectId)) {
                return;
            }
            document.getElementById(projectId).querySelector("button:last-of-type").click();
            list.parentElement.classList.remove("droppable");
            // event.preventDefault(); // not required
        });
    }
    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }
    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);
    }
    switchProject(projectId) {
        // const projectIndex = this.projects.findIndex((project) => +project.id === projectId);
        // this.projects.splice(projectIndex, 1);
        this.switchHandler(this.projects.find((project) => project.id === projectId));
        this.projects = this.projects.filter((project) => project.id !== projectId);
    }
}
class App {
    static init() {
        const activeProjectsList = new ProjectList("active");
        const finishedProjectsList = new ProjectList("finished");
        activeProjectsList.setSwitchHandlerFunction(finishedProjectsList.addProject.bind(finishedProjectsList));
        finishedProjectsList.setSwitchHandlerFunction(activeProjectsList.addProject.bind(activeProjectsList));
        // const timerId = setTimeout(this.startAnalytics, 3000);
        // document.getElementById("stop-analytics-btn")!.addEventListener("click", () => {
        // 	clearTimeout(timerId);
        // });
    }
    static startAnalytics() {
        const analyticsScript = document.createElement("script");
        analyticsScript.src = "./ts-built/assets/scripts/analytics.js";
        analyticsScript.defer = true;
        document.head.append(analyticsScript);
    }
}
App.init();