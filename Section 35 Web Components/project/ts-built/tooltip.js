"use strict";
class Tooltip extends HTMLElement {
    constructor(_tooltipVisible = false, _tooltipText = "Default tooltip text", _tooltipIcon = null) {
        super();
        this._tooltipVisible = _tooltipVisible;
        this._tooltipText = _tooltipText;
        this._tooltipIcon = _tooltipIcon;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
			<style>
				div {
					font-weight: normal;
					background-color: black;
					color: white;
					position: absolute;
					top: 1.5rem;
					left: 0.75rem;
					z-index: 10;
					border-radius: 3px;
					box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.26);
				}

				:host {
					position: relative;
				}

				:host(.important) {
					background: var(--color-primary, #ccc);
					padding: 0.15rem;
				}

				:host-context(p) {
					font-weight: bold;
				}

				.hightlight {
					background-color: red;
				}

				::slotted(.highlight) {
					border-bottom: 1px dotted red;
				}

				.icon {
					background: black;
					color: white;
					padding: 0.15rem 0.5rem;
					text-align: center;
					border-radius: 50%;
				}
			</style>
			<slot>Some text, Here we go!</slot>
			<span class="icon">?</span>
		`;
    }
    connectedCallback() {
        if (this.hasAttribute("text")) {
            this._tooltipText = this.getAttribute("text");
        }
        this._tooltipIcon = this.shadowRoot.querySelector("span");
        this._tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
        this._render();
    }
    disconnectedCallback() {
        this._tooltipIcon = null;
        this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
        this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
    }
    static get observedAttributes() {
        return ["text"];
    }
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (attributeName === "text") {
            this._tooltipText = newValue;
        }
    }
    _render() {
        let tooltipContainer = this.shadowRoot.querySelector("div");
        if (this._tooltipVisible) {
            tooltipContainer = document.createElement("div");
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        }
        else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }
    _showTooltip() {
        this._tooltipVisible = true;
        this._render();
    }
    _hideTooltip() {
        this._tooltipVisible = false;
        this._render();
    }
}
customElements.define("uc-tooltip", Tooltip);
