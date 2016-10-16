import React from "react";
import { browserHistory, Router, Route } from "react-router";
import App from "./components/app";
import NotFound from "./components/404";

//All routes (children...)
export const routes = (
	<Route>
		<Route path="/" component={App} />
		<Route path="*" component={NotFound} />
	</Route>
);

export default (
	<Router history={browserHistory}>
		{routes}
	</Router>
);
