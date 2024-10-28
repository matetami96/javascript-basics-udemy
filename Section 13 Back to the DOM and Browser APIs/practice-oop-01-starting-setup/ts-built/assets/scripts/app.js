"use strict";
class DOMHelper {
    // It creates a clone of the button element replaces the original element with the clone,
    // and returns the clone. This method is used to remove all event listeners from a button element.
    static clearEventListeners(element) {
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }
    static moveElement(elementId, newDestionationSelector) {
        // get the list element to move
        const element = document.getElementById(elementId);
        // get the list to move the list element to
        const destinationElement = document.querySelector(newDestionationSelector);
        destinationElement.append(element);
        element.scrollIntoView({ behavior: "smooth" });
    }
}
// base class that handles all the adding and removal of elements
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
            // this.element!.parentElement?.removeChild(this.element!);
        }
    }
    attach() {
        this.hostElement.insertAdjacentElement(this.insertBefore ? "afterbegin" : "beforeend", this.element);
    }
}
// creates a tooltip div that can be deleted
// every project can have a single tooltip
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
        const hostElementPositionLeft = this.hostElement.offsetLeft; // x coordinate
        const hostElementPositionTop = this.hostElement.offsetTop; // y coordinate
        const hostElementHeight = this.hostElement.clientHeight;
        // this tells me how far I scrolled in the given container
        const parentElementScrolling = this.hostElement.parentElement.scrollTop;
        const x = hostElementPositionLeft + 20;
        const y = hostElementPositionTop + hostElementHeight - parentElementScrolling - 10;
        tooltipElement.style.position = "absolute";
        tooltipElement.style.left = x + "px";
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
    }
    // shows a tooltip
    showMoreInfoHandler() {
        if (this.hasActiveTooltip) {
            return;
        }
        const projectElement = document.getElementById(this.id);
        const tooltipText = projectElement.dataset.extraInfo;
        const tooltip = new Tooltip(() => (this.hasActiveTooltip = false), tooltipText, this.id);
        tooltip.attach();
        this.hasActiveTooltip = true;
    }
    // gets the more info button and adds an event listener
    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfoButton = projectItemElement.querySelector("button:first-of-type");
        moreInfoButton.addEventListener("click", this.showMoreInfoHandler.bind(this));
    }
    // gets the switch button and adds an event listener after clearing the old event listeners
    connectSwitchButton(type) {
        const projectItemElement = document.getElementById(this.id);
        let switchButton = projectItemElement.querySelector("button:last-of-type");
        switchButton = DOMHelper.clearEventListeners(switchButton);
        switchButton.textContent = type === "active" ? "Finish" : "Activate";
        switchButton.addEventListener("click", this.updateProjectListsHandler.bind(null, this.id));
    }
    // this is needed to be able to readd a list item after moving it once
    // also we need to clear the old event listeners for the list items button and change the text
    update(updateProjectListsFunction, type) {
        this.updateProjectListsHandler = updateProjectListsFunction;
        this.connectSwitchButton(type);
    }
}
class ProjectList {
    // depending on the type get all the list items and add them to the project list
    // one for active and one for finished projects
    constructor(type) {
        this.type = type;
        this.projects = [];
        this.switchHandler = () => { };
        const projectItems = document.querySelectorAll(`#${this.type}-projects li`);
        // for each list item create a new project item that can be clicked
        // it will we updated and moved to the other type of list
        // so actives will be moved to the finished projects and vice versa
        for (const projectItem of projectItems) {
            this.projects.push(new ProjectItem(projectItem.id, this.switchProject.bind(this), this.type));
        }
    }
    // this sets the switch handler function that holds a reference
    // to the addProject function for the opposite projectlist's instance
    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }
    // this will be called when a project item is clicked
    // it will move the list element from one list to another
    // the special part is that it is never called for the current
    // projectlist instance the clicked project item belongs to
    // but the opposite, so clicking an active list items will move it to the finished list
    // and clicking a finished list item will move it to the active list
    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);
    }
    // this calls the switch handler function that is in fact a reference to the addProject function
    // for the other projectlist's instance, so for "active" the "finished" projectlists's addProject will be called
    // and for "finished" the "active" projectlist's addProject will be called
    // then the project will be removed from the projects array of the current instance
    switchProject(projectId) {
        // const projectIndex = this.projects.findIndex((project) => +project.id === projectId);
        // this.projects.splice(projectIndex, 1);
        this.switchHandler(this.projects.find((project) => project.id === projectId));
        this.projects = this.projects.filter((project) => project.id !== projectId);
    }
}
class App {
    static init() {
        // instantiate two project lists
        const activeProjectsList = new ProjectList("active");
        const finishedProjectsList = new ProjectList("finished");
        // set the switch handler functions, active projects should switch to finished projects and vice versa
        activeProjectsList.setSwitchHandlerFunction(finishedProjectsList.addProject.bind(finishedProjectsList));
        finishedProjectsList.setSwitchHandlerFunction(activeProjectsList.addProject.bind(activeProjectsList));
        const timerId = setTimeout(this.startAnalytics, 3000);
        document.getElementById("stop-analytics-button").addEventListener("click", () => {
            clearTimeout(timerId);
        });
    }
    static startAnalytics() {
        const analyticsScript = document.createElement("script");
        analyticsScript.src = "./ts-built/assets/scripts/analytics.js";
        analyticsScript.defer = true;
        document.head.append(analyticsScript);
    }
}
App.init();
