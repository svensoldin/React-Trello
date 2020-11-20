import React from "react";
import { useAuthDispatch, logout } from "../../context/index";

import "./UserHeader.styles.css";

type Props = {
	name: string;
};

const UserHeader = ({ name }: Props) => {
	const dispatch = useAuthDispatch();
	const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// Trigger the logout action passing dispatch as an arg
		logout(dispatch);
	};
	return (
		<div className="user-header">
			<p>{name}</p>
			<button onClick={handleLogout} className="logout-btn">
				Logout
			</button>
		</div>
	);
};

export default UserHeader;
