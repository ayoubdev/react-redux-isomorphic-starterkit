var webpack = require("webpack");
var shared = require("./webpack.shared.js");

var loaders = [{
	test: /\.js[x]?$/,
	include: shared.APP_DIR,
	loader: "babel",
	query: {
		presets: [
			["es2015", { modules: false }],
			"react"
		],
		plugins: [
			"transform-class-properties",
			//cf. configuration React Hot Loader 3.X: 
			//https://github.com/gaearon/react-hot-loader/issues/243#issuecomment-211957140
			"react-hot-loader/babel"
		]
	}
}, {
	test: /\.css$/,
	loaders: [
		{
			loader: "style"
		},
		{
			loader: "css",
			query: {
				modules: true,
				localIdentName: "[path]-[name]_[local]-[hash:base64:5]"
			}
		}
	]
}, {
	test: /\.scss$/,
	loaders: [
		{
			loader: "style"
		},
		{
			loader: "css",
			query: {
				modules: true,
				localIdentName: "[path]-[name]_[local]-[hash:base64:5]"
			}
		},
		{
			loader: "sass"
		}
	]
}, {
	test: /\.(jp[e]?g|png|gif|svg)$/i,
	loader: "file",
	query: {
		name: "img/[name].[ext]"
	}
}, {
	test: /\.(html|ico)$/i,
	loader: "file",
	query: {
		name: "[name].[ext]"
	}
}];

var client = {
	name: "dev.client",
	target: "web",
	entry: {
		"client.bundle": [
			//cf. configuration React Hot Loader 3.X: 
			//https://github.com/gaearon/react-hot-loader/issues/243#issuecomment-211957140
			"react-hot-loader/patch",
			"webpack/hot/only-dev-server",
			"webpack-dev-server/client?http://localhost:8081",
			shared.APP_DIR + "/client"
		]
	},
	output: {
		filename: "[name].js",
		path: shared.CLIENT_BUILD_DIR,
		publicPath: "http://localhost:8081/"
	},
	module: {
		loaders: loaders
	},
	resolve: {
		extensions: [".js", ".jsx"],
		modules: [
			"node_modules",
			"src/shared"
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	//devtool pour permettre d'activer le mapping entre le bundle et le code source autorisant
	//un debugging facilité (fichier + ligne correspondant au code source et non au bundle):
	devtool: "source-maps"
};

module.exports = client;
