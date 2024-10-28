import * as _ from "lodash";

import { ProjectList } from "./App/ProjectList";
// (window as any)["DEFAULT_VALUE"] = "Tomi";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any)["DEFAULT_VALUE"] = "Tomi";
console.log(_.difference([1, 2, 3], [1, 2, 4]));
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
