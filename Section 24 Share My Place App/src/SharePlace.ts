import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getAddressFromCoordinates, getCoordinatesFromAddress } from "./Utility/Location";
class PlaceFinder {
	shareButton;
	sharedLinkInputElement;
	constructor(public map: Map | null = null) {
		const addressForm = document.querySelector("form") as HTMLFormElement;
		const locateUserButton = document.getElementById("locate-btn") as HTMLButtonElement;
		this.shareButton = document.getElementById("share-btn") as HTMLButtonElement;
		this.sharedLinkInputElement = document.getElementById("share-link") as HTMLInputElement;

		if (this.shareButton) {
			this.shareButton.addEventListener("click", () => {
				this.sharePlaceHandler();
			});
		}

		if (locateUserButton) {
			locateUserButton.addEventListener(
				"click",
				/* this.locateUserHandler.bind(this) */ () => {
					this.locateUserHandler();
				}
			);
		}

		if (addressForm) {
			addressForm.addEventListener(
				"submit",
				/* this.findAddressHandler.bind(this) */ (event) => {
					this.findAddressHandler(event);
				}
			);
		}
	}

	getLoadingModal() {
		return new Modal("loading-modal-content", "Loading location - please wait.");
	}

	selectPlace(coordinates: google.maps.LatLngLiteral, address: string) {
		if (this.map) {
			this.map.render(coordinates);
		} else {
			this.map = new Map(coordinates);
		}

		this.shareButton.disabled = false;
		this.sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${
			coordinates.lat
		}&lng=${coordinates.lng}`;
	}

	async sharePlaceHandler() {
		if (!navigator.clipboard) {
			this.sharedLinkInputElement.select();
			return;
		}

		try {
			await navigator.clipboard.writeText(this.sharedLinkInputElement.value);
			alert("Shared link copied to clipboard.");
		} catch (error) {
			console.log(error);
			alert(error);
			this.sharedLinkInputElement.select();
		}
	}

	locateUserHandler() {
		if (!navigator.geolocation) {
			alert(
				"Location feature is not available in your browser - please use a more modern browser or manually enter an address."
			);
			return;
		}

		const modal = this.getLoadingModal();
		modal.show();
		navigator.geolocation.getCurrentPosition(
			async (successResult) => {
				const coordinates = {
					lat: successResult.coords.latitude /* + Math.random() * 50 */,
					lng: successResult.coords.longitude /* + Math.random() * 50 */,
				};
				const address = await getAddressFromCoordinates(coordinates);
				modal.hide();
				this.selectPlace(coordinates, address);
			},
			(error) => {
				modal.hide();
				console.log(error);
				alert("Could not locate your location. Please enter an address manually.");
			}
		);
	}
	async findAddressHandler(event: SubmitEvent) {
		event.preventDefault();
		const address = (event.target as HTMLFormElement).querySelector("input")!.value;

		if (!address || address.trim().length === 0) {
			alert("Invalid address entered - please try again.");
			return;
		}

		const modal = this.getLoadingModal();
		modal.show();
		try {
			const coordinates = await getCoordinatesFromAddress(address);
			this.selectPlace(coordinates, address);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
				alert(error.message);
			}
		}
		modal.hide();
	}
}

new PlaceFinder();
