import { ProjectList } from "./App/ProjectList.js";
// (window as any)["DEFAULT_VALUE"] = "Tomi";
globalThis["DEFAULT_VALUE"] = "Tomi";
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
        analyticsScript.src = "./ts-built/assets/scripts/Utility/Analytics.js";
        analyticsScript.defer = true;
        document.head.append(analyticsScript);
    }
}
App.init();
