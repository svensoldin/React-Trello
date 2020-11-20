import React from "react";
import UserHeader from "../user-header/UserHeader.component";
import { useAuthState } from "../../context/index";
import { Board } from "../../App";

import "./Header.styles.css";

type Props = {
	currentBoard?: Board | undefined;
};

const Header = ({ currentBoard }: Props) => {
	const user = useAuthState();

	return (
		<div className="header">
			<h3>Thullo</h3>
			{user.token ? (
				<div className="nav">
					{currentBoard ? (
						<h2 className="board-title">{currentBoard.title}</h2>
					) : (
						<div className="ghost-title"></div>
					)}
					<input type="text" className="nav-input" />
					<UserHeader name={user.userDetails.name} />
				</div> //This should be a separate component
			) : null}
		</div>
	);
};

export default Header;
