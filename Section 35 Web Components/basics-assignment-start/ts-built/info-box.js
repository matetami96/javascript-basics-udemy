"use strict";
// teacher's solution
/* class InfoBox extends HTMLElement {
    _isVisible = false;
    _toggleButton: HTMLButtonElement | null;
    _infoBox: HTMLParagraphElement | null;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot!.innerHTML = `
        <style>
        #info-box {
            display: none;
        }
        </style>
        <button>Show</button>
        <p id="info-box" >
            <slot></slot>
        </p>
        `;
        this._toggleButton = this.shadowRoot!.querySelector("button");
        this._infoBox = this.shadowRoot!.querySelector("#info-box");
        this._toggleButton!.addEventListener("click", () => {
            this._toggleInfoBox();
        });
    }

    connectedCallback() {
        if (this.hasAttribute("is-visible")) {
            if (this.getAttribute("is-visible") === "true") {
                this._isVisible = true;
                this._infoBox!.style.display = "block";
                this._toggleButton!.textContent = "Hide";
            }
        }
    }

    _toggleInfoBox() {
        this._isVisible = !this._isVisible;
        this._infoBox!.style.display = this._isVisible ? "block" : "none";
        this._toggleButton!.textContent = this._isVisible ? "Hide" : "Show";
    }
}

customElements.define("uc-info-box", InfoBox); */
// my solution
class InfoBox extends HTMLElement {
    constructor(infoVisible = true, infoButton = null, infoText = null) {
        super();
        this.infoVisible = infoVisible;
        this.infoButton = infoButton;
        this.infoText = infoText;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
		<button>Show</button>
		<p id="info-box" ><slot></slot></p>
		`;
        this.infoButton = this.shadowRoot.querySelector("button");
        this.infoText = this.shadowRoot.querySelector("p");
        this.infoButton.addEventListener("click", () => {
            this._toggleInfoBox();
        });
    }
    connectedCallback() {
        if (this.hasAttribute("is-visible") && this.getAttribute("is-visible") === "true") {
            this.infoVisible = true;
            this.infoText.style.display = "block";
            this.infoButton.textContent = "Hide";
        }
    }
    _toggleInfoBox() {
        this.infoVisible = !this.infoVisible;
        this.infoText.style.display = this.infoVisible ? "block" : "none";
        this.infoButton.textContent = this.infoVisible ? "Hide" : "Show";
    }
}
customElements.define("uc-info-box", InfoBox);
