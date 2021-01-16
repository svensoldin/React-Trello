import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "../../context/index";

//Components
import UserHeader from "../user-header/UserHeader.component";
import Searchbar from "../searchbar/Searchbar.component";
import AppBar from "@material-ui/core/AppBar";
import { ReactComponent as TrelloLogo } from "../../assets/trello.svg";

import "./Header.styles.css";

const appBarStyles = {
	background: "#fff",
	minHeight: 60,
	maxHeight: 60,
};

const Header = () => {
	const user = useAuthState();
	const {
		userDetails: { id, name },
	} = user;
	return (
		<AppBar position="static" style={appBarStyles}>
			<header className="header">
				<Link to="/" className="title-container">
					<TrelloLogo style={{ width: 30 }} />
					<h3 className="main-title">Thullo</h3>
				</Link>
				{id ? (
					<nav className="nav">
						<Searchbar />
						<UserHeader name={name} />
					</nav> //This should be a separate component
				) : null}
			</header>
		</AppBar>
	);
};

export default Header;
