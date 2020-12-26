import React from "react";
import { useAuthState } from "../../context/index";

//Components
import UserHeader from "../user-header/UserHeader.component";
import Searchbar from "../searchbar/Searchbar.component";
import AppBar from "@material-ui/core/AppBar";
import { ReactComponent as TrelloLogo } from "../../assets/trello.svg";

import "./Header.styles.css";

const appBarStyles = {
	background: "#2196f3",
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
			<div className="header">
				<div className="title-container">
					<TrelloLogo style={{ width: 30 }} />
					<h3 className="main-title">Thullo</h3>
				</div>
				{id ? (
					<div className="nav">
						<Searchbar />
						<UserHeader name={name} />
					</div> //This should be a separate component
				) : null}
			</div>
		</AppBar>
	);
};

export default Header;
