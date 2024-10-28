"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://admin:TFJVSRegEuAE98@learningcluster.ythrc.mongodb.net/?retryWrites=true&w=majority&appName=LearningCluster";
// Create a MongoClient
const client = new mongodb_1.MongoClient(uri);
const getUserLocation = (locationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const database = client.db("learning");
        const location = database.collection("user-locations");
        const result = yield location.findOne({ _id: new mongodb_1.ObjectId(locationId) });
        // console.log("result", result);
        return result;
    }
    finally {
        // Ensures that the client will close when you finish/error
        yield client.close();
    }
});
function saveUserLocation(userLocation) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const database = client.db("learning");
            const location = database.collection("user-locations");
            const result = yield location.insertOne({
                coordinates: userLocation.coordinates,
                address: userLocation.address,
            });
            // console.log("result", result);
            return result.insertedId;
        }
        finally {
            // Ensures that the client will close when you finish/error
            yield client.close();
        }
    });
}
exports.router = express_1.default.Router();
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
exports.router.post("/add-location", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userLocation = {
        address: request.body.address,
        coordinates: {
            lat: request.body.lat,
            lng: request.body.lng,
        },
    };
    const insertedId = yield saveUserLocation(userLocation).catch(console.dir);
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
}));
exports.router.get("/location/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const location = yield getUserLocation(request.params.id).catch(console.dir);
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
}));
