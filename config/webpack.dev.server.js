var ExtractTextPlugin = require("extract-text-webpack-plugin");
var shared = require("./webpack.shared.js");

var loaders = [{
	test: /\.js[x]?$/,
	include: shared.APP_DIR,
	loader: "babel",
	query: {
		presets: [
			//modules: false pour avertir Babel de ne pas transformer en targettant commonjs (via transform-es2015-modules-commonjs)
			//permettant ainsi de laisser Webpack gérer le tree shaking ES6 (commonjs n'est pas compatible avec le tree shaking process):
			
			//Pour rappel, le tree shaking est un processus de bundling permettant d'éliminer 
			//du code non utilisé en se basant sur la gestion des modules ES2015 (import/export)
			//ce que ne permet pas commonjs ou autre gestionnaire de module < ES2015 (cf. https://github.com/rollup/rollup#dont-minifiers-already-do-this)
			//Le tree shaking permet donc d'éliminer tout code non utilisé (par exemple, une fonction exportée mais non importée...):
			[ "es2015", {modules: false} ],
			"react"
		],
		plugins: [
			"transform-class-properties"
		]
	}
}, {
	test: /\.css$/,
	loader: ExtractTextPlugin.extract({
		//options.fallbackLoader: string | object | loader[] the loader(s) that should be used when the css is not extracted 
		//Donc ici si ExtractTextPlugin n'arrive pas à extraire les css importés dans le fichier spécifié, style-loader sera exécuté en fallback
		//Pour rappel, style-loader permet d'insérer un tag <style> dans le DOM à chaque css importé:
		fallbackLoader: "style",
		//options.loader: string | object | loader[] (required) the loader(s) that should be used for converting the resource to a css exporting module
		loader: {
			loader: "css",
			query: {
				modules: true,
				localIdentName: "[path]-[name]_[local]-[hash:base64:5]"
			}
		}
	})
}, {
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract({
		fallbackLoader: "style",
		loader: [
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
	})
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

var server = {
	name: "dev.server",
	target: "node",
	externals: [
		//On exclue les librairies node_modules du bundling car runné sur le serveur (le serveur a accès à node_modules):
		/^[a-z\-0-9]+$/, {
			"react-dom/server": true
		}
	],
	entry: {
		"server.bundle": shared.APP_DIR + "/server"
	},
	output: {
		filename: "[name].js",
		path: shared.SERVER_BUILD_DIR,
		publicPath: "http://localhost:8081/",
		//On doit targetter le format commonJS pour bundler notre app. Cela permet à notre serveur nodeJS d'utiliser 
		//la fonction require() pour récupérer les libs définies comme externals depuis node_modules:
		//Ceci n'affecte pas le process de tree shaking puisque libraryTarget permet juste d'influencer la 
		//syntaxe avec laquelle un module est exporté: (On peut vérifier que le tree shaking est activé facilement en regardant
		//le résultat du bundle (ici: dist/server.bundle.js: si pour un export non utilisé, on a: "unused harmony export tata", 
		//le tree shaking est activé et la fonction tata() exportée sera supprimée lors de la minification :)) 
		libraryTarget: "commonjs2"
	},
	module: {
		//Webpack 1.X loaders <=> rules (cf. schema validation for Webpack 2.X: 
		//https://github.com/webpack/webpack/blob/master/schemas/webpackOptionsSchema.json)
		rules: loaders
	},
	resolve: {
		extensions: [".js", ".jsx"],
		modules: [
			"node_modules",
			"src/shared"
		]
	},
	plugins: [
		new ExtractTextPlugin("[name].css")
	]
};

module.exports = server;
