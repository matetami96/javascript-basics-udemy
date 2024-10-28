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
const puppeteer_1 = __importDefault(require("puppeteer"));
const util_1 = require("../util");
test("should output name and age", () => {
    expect((0, util_1.generateText)("Tomi", "28")).toBe("Tomi (28 years old)");
    // expect(generateText("Emoji", "27")).toBe("Emoji (27 years old)");
});
/* test("should output dataless text", () => {
    expect(generateText("", "")).toBe(" ( years old)");
}); */
test("should generate a valid text output", () => {
    expect((0, util_1.checkAndGenerate)("Tomi", "28")).toBe("Tomi (28 years old)");
});
test("should fill out the form and create a new list item", () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({
        headless: false,
        slowMo: 80,
        args: ["--window-size=1920,1080"],
        devtools: true,
    });
    const page = yield browser.newPage();
    yield page.goto("http://127.0.0.1:5500/index.html");
    yield page.click("#name");
    yield page.type("#name", "Tomi");
    yield page.click("#age");
    yield page.type("#age", "28");
    yield page.click("#btnAddUser");
    const finalText = yield page.$eval(".user-item", (el) => el.textContent);
    expect(finalText).toBe("Tomi (28 years old)");
    yield browser.close();
}), 10000);
