import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import "webpack-dev-server";

const config: webpack.Configuration = {
	mode: "production", // or "production", depending on your use case
	// Entry point of the application
	entry: {
		shop: "./src/optimized/shop.ts",
	},
	// Output configuration
	output: {
		// Only bundle JS files should go here
		filename: "assets/scripts/[name].[contenthash].js", // Bundled JS files in assets/scripts/
		path: path.resolve(__dirname, "dist"), // Base output directory is dist/
		clean: true, // Clean dist folder before each build
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
						// Babel options are read from .babelrc or babel.config.js
						options: {},
					},
					{
						loader: "ts-loader",
						options: {
							// Since Babel will handle transpiling
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
	// Optional: Enable source maps for easier debugging
	devtool: "cheap-source-map",
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
		hot: false,
		liveReload: true,
		historyApiFallback: true, // Useful for single-page apps
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html", // Original source HTML
			filename: "index.html", // Output to root of dist folder
		}),
		// Copy static assets but exclude .html and .css files
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "assets", // Source folder
					to: "assets", // Copy to dist/assets/
				},
			],
		}),
		new ForkTsCheckerWebpackPlugin({
			async: false, // Run type checking synchronously
			typescript: {
				// TypeScript options
				configFile: "./tsconfig.json",
			},
		}),
	],
};

export default config;
