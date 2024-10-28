jest.mock("axios");
// jest.mock("../http");

import { loadTitle } from "../util";

test("should print an uppercase text", async () => {
	const title = await loadTitle();
	expect(title).toBe("DELECTUS AUT AUTEM");
});
