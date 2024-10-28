export class Map {
	constructor(public coordinates: google.maps.LatLngLiteral) {
		this.render(coordinates);
	}

	async render(coordinates: google.maps.LatLngLiteral) {
		if (!google) {
			alert("Could not load Google Maps library - please try again later.");
			return;
		}

		// Request needed libraries.
		const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
		const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

		const map = new Map(document.getElementById("map") as HTMLDivElement, {
			center: coordinates,
			zoom: 16,
			mapId: "DEMO_MAP_ID", // Map ID is required for advanced markers.
		});
		new AdvancedMarkerElement({
			position: coordinates,
			map: map,
			title: "You are here!",
		});
	}
}
