import React, { PropTypes } from "react";
import { browserHistory, Router } from "react-router";

const Root = (props) => {
	//TODO store:
	return (
		<Router history={browserHistory} routes={props.routes} />
	);
};

Root.propTypes = {
	routes: PropTypes.element.isRequired
};

export default Root;