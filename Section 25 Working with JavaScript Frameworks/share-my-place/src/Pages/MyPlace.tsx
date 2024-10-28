import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../UI/Header";
import SelectedPlace from "../UI/SelectedPlace";
import "./MyPlace.css";
import { CoordinateType } from "../Utility/types";

const MyPlace = () => {
	const [myPlaceState, setMyPlaceState] = useState<{ coordinates: CoordinateType; address: string } | null>(null);

	useEffect(() => {
		const fetchMyPlace = async () => {
			try {
				const url = new URL(window.location.href);
				const queryParams = url.searchParams;
				const locationId = queryParams.get("location");
				const response = await axios.get("http://localhost:3000/location/" + locationId);

				setMyPlaceState((previousState) => ({
					...previousState,
					coordinates: response.data.coordinates,
					address: response.data.address,
				}));
			} catch (error) {
				if (axios.isAxiosError(error)) {
					// console.log(error.status);
					// console.error(error.response);
					alert(error.response!.data.message);
				} else {
					console.error(error);
				}
			}
			/* const coordinates = {
				lat: +queryParams.get("lat")!,
				lng: +queryParams.get("lng")!,
			};
			const address = queryParams.get("address")!; */
		};

		fetchMyPlace();

		return () => {
			setMyPlaceState(null);
		};
	}, []);

	return (
		<>
			{myPlaceState && <Header title={myPlaceState.address} />}
			{myPlaceState && (
				<SelectedPlace centerCoordinates={myPlaceState.coordinates} fallbackText="Could not find location!" />
			)}
			<section id="share-controls">
				<Link to="/">Share a new place!</Link>
			</section>
		</>
	);
};

export default MyPlace;
