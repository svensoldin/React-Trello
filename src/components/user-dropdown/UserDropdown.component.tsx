import * as React from "react";
import { useAuthState } from "../../context/index";

// Components
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

import "./UserDropdown.styles.css";

type Props = {
	handleLogout: (e: React.MouseEvent<any>) => void;
	avatarURL: string | undefined;
};

const UserDropdown = ({ handleLogout, avatarURL }: Props) => {
	const {
		userDetails: { name, email },
	} = useAuthState();
	return (
		<Paper className="user-dropdown">
			<div className="user-info">
				<Avatar src={avatarURL}>{name.split("")[0]}</Avatar>
				<div className="name-email">
					<p>{name}</p>
					<p className="user-email">{email}</p>
				</div>
			</div>
			<Link to="/" className="link">
				<div className="dropdown-item">Dashboard</div>
			</Link>
			<Link to="/profile" className="link">
				<div className="dropdown-item">Profile</div>
			</Link>
			<div className="dropdown-item logout" onClick={handleLogout}>
				Logout
			</div>
		</Paper>
	);
};

export default UserDropdown;
