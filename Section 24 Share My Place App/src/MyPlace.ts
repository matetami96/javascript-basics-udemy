import { Map } from "./UI/Map";

class LoadedPlace {
	constructor(public coordinates: google.maps.LatLngLiteral, public address: string) {
		new Map(coordinates);
		const headerTitleElement = document.querySelector("header h1") as HTMLHeadingElement;
		headerTitleElement.textContent = address;
	}
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coordinates = {
	lat: +queryParams.get("lat")!,
	lng: +queryParams.get("lng")!,
};
const address = queryParams.get("address")!;
new LoadedPlace(coordinates, address);
