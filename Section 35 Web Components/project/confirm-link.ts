class ConfirmLink extends HTMLAnchorElement {
	connectedCallback() {
		this.addEventListener("click", (event: Event) => {
			if (!confirm("Do you really want to leave?")) {
				event.preventDefault();
			}
		});
	}
}

customElements.define("uc-confirm-link", ConfirmLink, { extends: "a" });
