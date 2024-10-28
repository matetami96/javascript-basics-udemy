import express from "express";
import { Request, Response, NextFunction } from "express";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGO_DB_URL!;

// Create a MongoClient
const client = new MongoClient(uri);

interface UserLocation {
	address: string;
	coordinates: {
		lat: number;
		lng: number;
	};
}

const getUserLocation = async (locationId: string) => {
	try {
		await client.connect();
		const database = client.db("learning");
		const location = database.collection<UserLocation>("user-locations");
		const result = await location.findOne({ _id: new ObjectId(locationId) });
		// console.log("result", result);

		return result;
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
};

async function saveUserLocation(userLocation: UserLocation) {
	try {
		await client.connect();
		const database = client.db("learning");
		const location = database.collection<UserLocation>("user-locations");
		const result = await location.insertOne({
			coordinates: userLocation.coordinates,
			address: userLocation.address,
		});
		// console.log("result", result);

		return result.insertedId;
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

export const router = express.Router();

/* type locationStorageType = {
	locations: {
		address: string;
		coordinates: {
			lat: number;
			lng: number;
		};
	}[];
};

const locationStorage: locationStorageType = {
	locations: [],
}; */

router.post("/add-location", async (request: Request, response: Response, next: NextFunction) => {
	const userLocation = {
		address: request.body.address,
		coordinates: {
			lat: request.body.lat,
			lng: request.body.lng,
		},
	};

	const insertedId = await saveUserLocation(userLocation).catch(console.dir);

	if (!insertedId) {
		response.status(500).json({ message: "Could not save location!" });
		return;
	}

	response.json({
		message: "Location added successfully",
		locationId: insertedId,
	});

	/* locationStorage.locations.push({
		address: request.body.address,
		coordinates: {
			lat: request.body.lat,
			lng: request.body.lng,
		},
	});
	response.json({
		message: "Location added successfully",
		locationId: id,
	}); */
});

router.get("/location/:id", async (request: Request, response: Response, next: NextFunction) => {
	const location = await getUserLocation(request.params.id).catch(console.dir);
	// const location = locationStorage.locations.find((location) => location.id === locationId);

	if (!location) {
		response.status(404).json({
			message: "Location not found!",
		});
		return;
	}

	response.json({
		address: location.address,
		coordinates: location.coordinates,
	});
});
