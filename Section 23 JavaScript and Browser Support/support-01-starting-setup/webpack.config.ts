import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import "webpack-dev-server";

const config: webpack.Configuration = {
	// or "production", depending on your use case
	mode: "development",
	// Entry point of the application
	entry: "./src/app.ts",
	// Output configuration
	output: {
		filename: "bundle.js", // Output file name
		path: path.resolve(__dirname, "dist"), // Output directory
		clean: true, // Clean the output directory before each build
	},
	// Resolve extensions for TypeScript and JavaScript files
	resolve: {
		extensions: [".ts", ".js"],
	},
	// Module rules for how to handle different file types
	module: {
		rules: [
			{
				test: /\.ts$/, // Use 'ts-loader' for all .ts files
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							// Babel options are read from .babelrc or babel.config.js
						},
					},
					{
						loader: "ts-loader",
						options: {
							transpileOnly: true, // Since Babel will handle transpiling
						},
					},
				],
			},
		],
	},
	// Optional: Enable source maps for easier debugging
	devtool: "source-map",
	// Development server configuration (if using webpack-dev-server)
	// Adding devServer to main config
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
			// Specify the index file
			publicPath: "/",
		},
		compress: true,
		port: 9000,
		historyApiFallback: true, // Useful for single-page apps
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html", // Path to your index.html
			filename: "index.html", // Output file name
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "assets", to: "assets" }, // Copy the assets folder
			],
		}),
	],
};

export default config;
