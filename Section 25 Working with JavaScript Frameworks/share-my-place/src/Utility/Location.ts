import axios from "axios";

import { CoordinateType, GeocodeResponse } from "./types";

export const getAddressFromCoordinates = async (coordinates: CoordinateType): Promise<string> => {
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

		const address = response.data.results[0].formatted_address as string;

		return address;
	} catch (error) {
		throw new Error("Something went wrong in getAddressFromCoordinates: " + error);
	}
};

export const getCoordinatesFromAddress = async (address: string): Promise<CoordinateType> => {
	try {
		const response: GeocodeResponse = await axios.get(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${GOOGLE_API_KEY}`
		);

		if (response.data.status !== "OK") {
			throw new Error("Failed to fetch address. Please try again later.");
		}

		if (response.data.error_message) {
			throw new Error(response.data.error_message);
		}

		const coordinates = response.data.results[0].geometry.location;

		return coordinates;
	} catch (error) {
		throw new Error("Something went wrong in getCoordinatesFromAddress: " + error);
	}
};
