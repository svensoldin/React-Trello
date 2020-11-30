import React from "react";
import { useAuthState } from "../../context/index";
import { Board } from "../../App";

//Components
import UserHeader from "../user-header/UserHeader.component";
import Searchbar from "../searchbar/Searchbar.component";
import AppBar from "@material-ui/core/AppBar";

import "./Header.styles.css";

type Props = {
	currentBoard: Board | undefined;
};

const appBarStyles = {
	background: "#2196f3",
	minHeight: 60,
	maxHeight: 60,
};

const Header = ({ currentBoard }: Props) => {
	const user = useAuthState();
	const { userDetails, token } = user;
	return (
		<AppBar position="static" style={appBarStyles}>
			<div className="header">
				<div className="title-container">
					<h2 className="main-title">Thullo</h2>
					{currentBoard ? (
						<h3 className="board-title">{currentBoard.title}</h3>
					) : (
						<div className="ghost-title"></div>
					)}
				</div>
				{user.token ? (
					<div className="nav">
						<Searchbar />
						<UserHeader name={userDetails.name} token={token} />
					</div> //This should be a separate component
				) : null}
			</div>
		</AppBar>
	);
};

export default Header;
