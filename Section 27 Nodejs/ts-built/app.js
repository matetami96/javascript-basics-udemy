"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const location_1 = require("./routes/location");
const app = (0, express_1.default)();
/* app.set("view engine", "ejs");
app.set("views", "../views"); */
app.use(body_parser_1.default.json());
app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(location_1.router);
/* app.use((request, response, next) => {
    response.setHeader("Content-Type", "text/html");
    next();
});
app.use((request, response, next) => {
    const userName = request.body.username || "Unknown User";
    response.render("index", { userName });
}); */
app.listen(3000);
/*
// pure nodejs

import http from "node:http";

const server = http.createServer((request, response) => {
    let body: Buffer[] = [];
    request
        .on("data", (chunk) => {
            body.push(chunk);
        })
        .on("end", () => {
            const requestBody = Buffer.concat(body).toString();
            let userName = "Unknown User";

            if (requestBody) {
                userName = requestBody.split("=")[1];
            }

            response.setHeader("Content-Type", "text/html");
            response.write(
                `<h1>Hello, ${userName}!</h1><form method='POST' action='/'><input name='username' type='text'/><button type='submit'>Send</button></form>`
            );
            response.end();
        });
});

server.listen(3000); */
/*
// files
import fs from "node:fs";

fs.readFile("../user-data.txt", (err, data) => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log(data.toString());
    }
});

fs.writeFile("../user-data.txt", "username=Tomi", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Wrote to file!");
    }
});
 */
