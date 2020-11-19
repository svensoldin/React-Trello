import React from "react";
import UserHeader from "../user-header/UserHeader.component";
import { useAuthState } from "../../context/index";

import "./Header.styles.css";

type Props = {
	boardName?: string;
};

const Header = ({ boardName }: Props) => {
	const user = useAuthState();
	return (
		<div className="header">
			<h3>Thullo</h3>
			{user.token ? (
				<div>
					<h2>{boardName}</h2>
					<input type="text" />
					<UserHeader name={user.userDetails.name} />
				</div> //This should be a separate component
			) : null}
		</div>
	);
};

export default Header;
