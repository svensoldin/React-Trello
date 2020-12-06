import React from "react";
import { useAuthState } from "../../context/index";

//Components
import UserHeader from "../user-header/UserHeader.component";
import Searchbar from "../searchbar/Searchbar.component";
import AppBar from "@material-ui/core/AppBar";

import "./Header.styles.css";

const appBarStyles = {
	background: "#2196f3",
	minHeight: 60,
	maxHeight: 60,
};

const Header = () => {
	const user = useAuthState();
	const { userDetails } = user;
	return (
		<AppBar position="static" style={appBarStyles}>
			<div className="header">
				<div className="title-container">
					<h2 className="main-title">Thullo</h2>
				</div>
				{userDetails.id ? (
					<div className="nav">
						<Searchbar />
						<UserHeader name={userDetails.name} />
					</div> //This should be a separate component
				) : null}
			</div>
		</AppBar>
	);
};

export default Header;
