import { defineConfig } from "vite";
import dotenv from "dotenv";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		legacy({
			targets: ["defaults", "not IE 11"],
			additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
		}),
	],
	define: {
		GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
	},
});
