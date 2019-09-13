/* eslint-disable no-undef */

const path = require("path")

const config = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "main.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				query: {
					presets: ["@babel/preset-react"]
				}
			}
		]
	},
	devServer: {
		contentBase: path.resolve(__dirname, "build"),
		compress: true,
		port: 3000,
		proxy: [
			{
				path: "/api",
				target: "http://localhost:3007"
			}
		]
	},
	devtool: "source-map"
}

module.exports = config
