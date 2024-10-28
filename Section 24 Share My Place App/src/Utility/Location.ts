import axios from "axios";

export const getAddressFromCoordinates = async (coordinates: google.maps.LatLngLiteral) => {
	try {
		const response = await axios.get(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_API_KEY}`
		);

		if (response.data.status !== "OK") {
			throw new Error("Failed to fetch address. Please try again later.");
		}

		if (response.data.error_message) {
			throw new Error(response.data.error_message);
		}

		/* const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_API_KEY}`
		);

		if (!response.ok) {
			throw new Error("Failed to fetch address. Please try again later.");
		}

		const data = await response.json();

		if (data.error_message) {
			throw new Error(data.error_message);
		} */

		const address = response.data.results[0].formatted_address;

		return address;
	} catch (error) {
		throw new Error("Something went wrong: " + error);
	}
};
export const getCoordinatesFromAddress = async (address: string) => {
	const urlAddress = encodeURI(address);

	const response = await axios.get(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`
	);

	if (response.data.status !== "OK") {
		throw new Error("Failed to fetch address. Please try again later.");
	}

	if (response.data.error_message) {
		throw new Error(response.data.error_message);
	}

	/* const response = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`
	);

	if (!response.ok) {
		throw new Error("Failed to fetch coordinates. Please try again later.");
	}

	const data = await response.json();

	if (data.error_message) {
		throw new Error(data.error_message);
	} */

	const coordinates = response.data.results[0].geometry.location;

	return coordinates;
};
