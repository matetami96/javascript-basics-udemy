import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import "webpack-dev-server";
import "dotenv/config";

const config: webpack.Configuration = {
	mode: "production",
	entry: {
		"share-place": "./src/SharePlace.ts",
		"my-place": "./src/MyPlace.ts",
	},
	output: {
		filename: "assets/scripts/[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {},
					},
					{
						loader: "ts-loader",
						options: {
							transpileOnly: true,
						},
					},
				],
			},
		],
	},
	devtool: "cheap-source-map",
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
			publicPath: "/",
		},
		compress: true,
		port: 9000,
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
		}),
		new HtmlWebpackPlugin({
			template: "./src/my-place/index.html",
			filename: "my-place/index.html",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "assets",
					to: "assets",
				},
			],
		}),
		new ForkTsCheckerWebpackPlugin({
			async: false,
			typescript: {
				configFile: "./tsconfig.json",
			},
		}),
		new webpack.DefinePlugin({
			GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
		}),
	],
};

export default config;
