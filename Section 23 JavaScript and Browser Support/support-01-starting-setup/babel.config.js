module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				// Browserslist query for targeting
				// targets: {
				// 	browsers: ["defaults", "ie 11"],
				// },
				targets: "> 0.25%, not dead",
				useBuiltIns: "usage",
				corejs: { version: 3 },
				/* {
					targets: {
						browsers: ["defaults", "ie 11"], // Add older browser targets explicitly
					},
				}, */
			},
		],
		"@babel/preset-typescript",
	],
};
