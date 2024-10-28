import { useEffect, useRef } from "react";

import { CoordinateType } from "../Utility/types";
import "./SelectedPlace.css";

type SelectedPlaceProps = {
	centerCoordinates: CoordinateType;
	fallbackText: string;
};

const SelectedPlace = ({ centerCoordinates, fallbackText }: SelectedPlaceProps) => {
	const mapElementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const initMap = async () => {
			const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
			const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

			const map = new Map(mapElementRef.current!, {
				center: centerCoordinates,
				zoom: 7,
				mapId: "Shared_Place_ID",
			});
			new AdvancedMarkerElement({
				position: centerCoordinates,
				map: map,
				title: "You are here!",
			});
		};

		if (!google) {
			alert("Could not load Google Maps library - please try again later.");
			return;
		}

		if (centerCoordinates) {
			initMap();
		}
	}, [centerCoordinates]);

	return (
		<section id="selected-place">
			<div ref={mapElementRef}>{!centerCoordinates && <p>{fallbackText}</p>}</div>
		</section>
	);
};

export default SelectedPlace;
