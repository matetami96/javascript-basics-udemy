import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended, // All ESLint recommended rules
	...tseslint.configs.recommended, // All TypeScript ESLint recommended rules
	{
		env: {
			browser: true, // For front-end code
			es2021: true,
			node: true, // For Node.js globals like `module`
		},
	},
	/* {
		rules: {
			"no-console": "warn", // Custom rule to warn on console.log
			"no-unused-vars": "warn", // Example custom rule
			"no-undef": "warn", // Another custom rule
		},
	}, */
];
