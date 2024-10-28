"use strict";
class Tooltip extends HTMLElement {
    constructor() {
        super();
        console.log("tooltip constructor");
    }
}
customElements.define("uc-tooltip", Tooltip);
