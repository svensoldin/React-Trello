import React from "react";
import { useAuthState } from "../../context/index";
import { Board } from "../../App";

//Components
import UserHeader from "../user-header/UserHeader.component";
import SearchBar from "../searchbar/SearchBar.component";

import "./Header.styles.css";

type Props = {
	currentBoard: Board | undefined;
};

const Header = ({ currentBoard }: Props) => {
	const user = useAuthState();

	return (
		<div className="header">
			<div className="title-container">
			<h2>Thullo</h2>
				{currentBoard ? (
						<h3 className="board-title">{currentBoard.title}</h3>
					) : (
						<div className="ghost-title"></div>
					)}
			</div>
			{user.token ? (
				<div className="nav">
					<SearchBar />
					<UserHeader name={user.userDetails.name} />
				</div> //This should be a separate component
			) : null}
		</div>
	);
};

export default Header;
