import React from "react";
import styles from "./style.scss";

class NotFound extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className={styles.notfound}>
				<p>
					Oups, route not found :( [404]
				</p>
			</div>
		);
	}
}

export default NotFound;
