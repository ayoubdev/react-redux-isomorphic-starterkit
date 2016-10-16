import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { routes } from "../shared/router.jsx";
import Root from "../shared/root.jsx";
import "../shared/favicon.ico";

function mount(routes) {
	if(module.hot) 
		ReactDOM.render(
			<AppContainer>
				<Root routes={routes} />
			</AppContainer>, 
			document.getElementById("app")
		);
	else 
		ReactDOM.render(
			<Root routes={routes} />, 
			document.getElementById("app")
		);
}

if(module.hot) {
	//Pour éviter l'erreur du type: "browser.js:49 Warning: [react-router] You cannot change <Router routes>; it will be ignored"
	//il suffit de créer une constante stockant l'ensemble des routes (donc immutable) pour éviter de réaffecter 
	//la propriété routes à <Router> à chaque hot loading (sans la réaffectation via la constante, l'objet routes (malgré 
	//qu'il soit const dans router.jsx) verra son fichier router.jsx reloadé via module.hot.accept et donc forcemment la const 
	//sera également reloadé et un nouvelle object routes importé sera affecté dans <Root routes={routes} />)
	//Etant donné que client/index.jsx n'est pas affecté par le hot reloading (car non spécifié dans module.hot.accept (ce 
	//dernier liste les fichiers à observer)) en stockant une const faisant référence au premier objet routes importés, on 
	//est sûr de ne jamais réaffecter un nouvel objet routes à Root:
	const immutableRoutes = routes;

	module.hot.accept("../shared/router.jsx", () => {
		//Si on utilise unmountComponentAtNode, on perd l'avantage de react-hot-loader qui permet de faire du hot 
		//loading en conservant les states (en démontant le noeud on perd les states):
		//ReactDOM.unmountComponentAtNode(document.getElementById("app"));
		mount(immutableRoutes);
	});
}

mount(routes);
