import Component from "./Component.js";

// console.log("Tooltip running.");
export class Tooltip extends Component {
	constructor(public closeNotifier: () => void, public tooltipText: string, hostElementId: string) {
		super(hostElementId);
		this.create();
	}

	closeTooltip = () => {
		this.detach();
		this.closeNotifier();
	};

	create() {
		const tooltipElement = document.createElement("div");
		tooltipElement.className = "card";
		const tooltipTemplate = document.getElementById("tooltip")! as HTMLTemplateElement;
		const tooltipBody = document.importNode(tooltipTemplate.content, true);
		tooltipBody.querySelector("p")!.textContent = this.tooltipText;
		tooltipElement.append(tooltipBody);

		const hostElPosLeft = this.hostElement.offsetLeft;
		const hostElPosTop = this.hostElement.offsetTop;
		const hostElHeight = this.hostElement.clientHeight;
		const parentElementScrolling = this.hostElement.parentElement!.scrollTop;

		const x = hostElPosLeft + 20;
		const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

		tooltipElement.style.position = "absolute";
		tooltipElement.style.left = x + "px"; // 500px
		tooltipElement.style.top = y + "px";

		tooltipElement.addEventListener("click", this.closeTooltip);
		this.element = tooltipElement;
	}
}
