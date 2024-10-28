"use strict";
/* const userId = "12345Tomiuserid";
const user = {
    name: "Tomi",
    age: 28,
    hobbies: ["cooking", "games"],
}; */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Get button elements
const retrieveButton = document.getElementById("retrieve-btn");
const storeButton = document.getElementById("store-btn");
// Initialize database variable
let db = null;
// indexedDB
// Helper function to get database instance
const getDBInstance = (event) => {
    if ("target" in event && event.target instanceof IDBOpenDBRequest) {
        return event.target.result;
    }
    return null;
};
// Helper function to get product store
const getProductStore = (db) => {
    return db.transaction("products", "readwrite").objectStore("products");
};
// Open IndexedDB connection
const dbRequest = indexedDB.open("StorageDummy", 1);
// Handle upgrade needed event
dbRequest.onupgradeneeded = (event) => __awaiter(void 0, void 0, void 0, function* () {
    db = getDBInstance(event);
    if (!db) {
        return;
    }
    // Create object store
    const objectStore = db.createObjectStore("products", { keyPath: "id" });
    // Add initial product data
    yield new Promise((resolve) => {
        objectStore.transaction.oncomplete = resolve;
        objectStore.add({
            id: "p1",
            title: "A first product",
            price: 12.99,
            tags: ["Expensive", "Luxury"],
        });
    });
});
// Handle success event
dbRequest.onsuccess = (event) => {
    db = getDBInstance(event);
};
// Handle error event
dbRequest.onerror = (event) => {
    console.error("Error:", event);
};
// Add event listeners to buttons
storeButton.addEventListener("click", () => {
    if (!db) {
        return;
    }
    const productsStore = getProductStore(db);
    try {
        productsStore.add({
            id: "p2",
            title: "A second product",
            price: 122.99,
            tags: ["Expensive", "Luxury"],
        });
    }
    catch (error) {
        console.error("Error adding product:", error);
    }
});
retrieveButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    if (!db) {
        return;
    }
    const productsStore = getProductStore(db);
    try {
        const request = productsStore.get("p2");
        const result = yield new Promise((resolve) => {
            request.onsuccess = () => resolve(request.result);
        });
        console.log(result);
    }
    catch (error) {
        console.error("Error retrieving product:", error);
    }
}));
// cookies
/* storeButton.addEventListener("click", () => {
    document.cookie = `uid=${userId}; max-age=360;`; // max-age=3600;
    document.cookie = `user=${JSON.stringify(user)};`;
});

retrieveButton.addEventListener("click", () => {
    const cookieData = document.cookie.split(";");
    console.log("cookieData", cookieData);
    const data = cookieData.map((cookie) => {
        return cookie.trim();
    });
    console.log("data", data);
    console.log(data.find((cookie) => cookie.includes("user"))!.split("=")[1]); // user data
}); */
// local and session storage
/* storeButton.addEventListener("click", () => {
    sessionStorage.setItem("uid", userId);
    localStorage.setItem("user", JSON.stringify(user));
});

retrieveButton.addEventListener("click", () => {
    const uid = sessionStorage.getItem("uid");
    const user = JSON.parse(localStorage.getItem("user") as string);

    if (uid && user) {
        console.log(uid);
        console.log(user);
    } else {
        console.log("No uid or user found!");
    }
}); */
