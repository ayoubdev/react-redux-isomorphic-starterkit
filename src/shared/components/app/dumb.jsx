import React from "react";
import { Link } from "react-router";
import "./style.scss";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toto: "Initial"
		};
	}

	onClick() {
		this.setState({
			toto: "Clicked"
		});
	}

	render() {
		console.log(this.state.toto);
		return(
			<div onClick={() => this.onClick()}>
				<p> App Container </p>
				{this.props.children}
				<Link to="/" style={styles.link}>Go back</Link>
			</div>
		);
	}
}

App.propTypes = {
	children: React.PropTypes.element
};

let styles = {
	link: {
		display: "block",
		position: "absolute",
		top: "35vh",
		left: "1.5em",
		color: "black",
		backgroundColor: "lightgrey",
		fontSize: "1.5em",
		textDecoration: "none",
		border: "1px solid black"
	},
	footer: {
		color: "white",
		fontSize: "2vmin",
		fontWeight: "bold",
		textAlign: "center"
	}
};

export default App;
