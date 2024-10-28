import puppeteer from "puppeteer";

import { generateText, checkAndGenerate } from "../util";

test("should output name and age", () => {
	expect(generateText("Tomi", "28")).toBe("Tomi (28 years old)");
	// expect(generateText("Emoji", "27")).toBe("Emoji (27 years old)");
});

/* test("should output dataless text", () => {
	expect(generateText("", "")).toBe(" ( years old)");
}); */

test("should generate a valid text output", () => {
	expect(checkAndGenerate("Tomi", "28")).toBe("Tomi (28 years old)");
});

test("should fill out the form and create a new list item", async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 80,
		args: ["--window-size=1920,1080"],
		devtools: true,
	});
	const page = await browser.newPage();
	await page.goto("http://127.0.0.1:5500/index.html");
	await page.click("#name");
	await page.type("#name", "Tomi");
	await page.click("#age");
	await page.type("#age", "28");
	await page.click("#btnAddUser");
	const finalText = await page.$eval(".user-item", (el) => el.textContent);
	expect(finalText).toBe("Tomi (28 years old)");
	await browser.close();
}, 10000);
