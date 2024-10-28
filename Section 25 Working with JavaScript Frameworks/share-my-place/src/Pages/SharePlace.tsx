import axios from "axios";
import { useState, useRef, useEffect } from "react";

import SelectedPlace from "../UI/SelectedPlace";
import Modal from "../UI/Modal";
import Header from "../UI/Header";
import { getCoordinatesFromAddress, getAddressFromCoordinates } from "../Utility/Location";
import { CoordinateType } from "../Utility/types";
import "./SharePlace.css";

const SharePlace = () => {
	const [sharePlaceState, setSharePlaceState] = useState({
		chosenCoordinates: null as CoordinateType | null,
		chosenAddress: "",
		shareableLink: "",
		isLoading: false,
	});
	const addressInputRef = useRef<HTMLInputElement>(null);
	const shareLinkRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const addLocation = async (coordinates: CoordinateType, address: string) => {
			const response = await axios.post("http://localhost:3000/add-location", {
				address,
				lat: coordinates.lat,
				lng: coordinates.lng,
			});
			setSharePlaceState((previousState) => ({
				...previousState,
				shareableLink: `${window.location.origin}/my-place?location=${response.data.locationId}`,
			}));
		};

		if (sharePlaceState.chosenAddress && sharePlaceState.chosenCoordinates) {
			try {
				addLocation(sharePlaceState.chosenCoordinates, sharePlaceState.chosenAddress);
			} catch (error) {
				console.error(error);
			}
		}
	}, [sharePlaceState.chosenAddress, sharePlaceState.chosenCoordinates]);

	const pickAddressHandler = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		const address = addressInputRef.current!.value;

		if (!address || address.trim().length === 0) {
			alert("Invalid address entered - please try again!");
			return;
		}

		setSharePlaceState((previousState) => ({
			...previousState,
			isLoading: true,
		}));

		try {
			const coordinates = await getCoordinatesFromAddress(address);
			setSharePlaceState((previousState) => ({
				...previousState,
				chosenCoordinates: coordinates,
				chosenAddress: address,
			}));
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}

		setSharePlaceState((previousState) => ({
			...previousState,
			isLoading: false,
		}));
	};

	const getUserLocationHandler = async () => {
		if (!navigator.geolocation) {
			alert(
				"Geolocation is not supported by your browser - please use a more modern browser or manually enter an address!"
			);
			return;
		}

		setSharePlaceState((previousState) => ({
			...previousState,
			isLoading: true,
		}));

		navigator.geolocation.getCurrentPosition(
			async (successResult) => {
				const coordinates = {
					lat: successResult.coords.latitude,
					lng: successResult.coords.longitude,
				};
				const address = await getAddressFromCoordinates(coordinates);
				setSharePlaceState((previousState) => ({
					...previousState,
					chosenCoordinates: coordinates,
					chosenAddress: address,
					isLoading: false,
				}));
			},
			(error) => {
				setSharePlaceState((previousState) => ({
					...previousState,
					isLoading: false,
				}));
				alert("Could not locate you unfortunately. Please enter an address manually!" + error);
			}
		);
	};

	const sharePlaceHandler = async () => {
		if (!navigator.clipboard) {
			shareLinkRef.current!.select();
			return;
		}

		try {
			await navigator.clipboard.writeText(sharePlaceState.shareableLink);
			alert("Shared link copied to clipboard.");
		} catch (error) {
			console.error(error);
			shareLinkRef.current!.select();
		}
	};

	return (
		<>
			{sharePlaceState.isLoading && (
				<Modal>
					<div className="modal__content centered">
						<div className="lds-dual-ring"></div>
					</div>
				</Modal>
			)}

			<Header title="Share a Place" />

			<SelectedPlace
				fallbackText="You haven't selected any place yet. Please enter an address or
            locate yourself!"
				centerCoordinates={sharePlaceState.chosenCoordinates!}
			/>

			<section id="share-controls">
				<input
					ref={shareLinkRef}
					value={sharePlaceState.shareableLink}
					type="text"
					readOnly
					placeholder="Select a place to get a sharable link."
				/>
				<button disabled={!sharePlaceState.shareableLink} onClick={sharePlaceHandler}>
					Share Place
				</button>
			</section>

			<section id="place-data">
				<form onSubmit={pickAddressHandler}>
					<label htmlFor="address">Address</label>
					<input type="text" id="address" ref={addressInputRef} />
					<button type="submit">Find Place</button>
				</form>
				<button onClick={getUserLocationHandler}>Get Current Location</button>
			</section>
		</>
	);
};

export default SharePlace;
