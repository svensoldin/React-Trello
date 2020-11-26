import React from "react";
import { useAuthDispatch, logout } from "../../context/index";

// Components
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./UserHeader.styles.css";

type Props = {
	name: string;
};

const UserHeader = ({ name }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [anchorElement, setAnchorElement] = React.useState();

	const dispatch = useAuthDispatch();
	const handleLogout = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		e.preventDefault();
		// Call the logout function with dispatch as an arg
		logout(dispatch);
		setIsMenuOpen(false);
	};
	return (
		<div className="user-header">
			<Avatar
				className="avatar"
				alt={name}
				color="orange"
				aria-controls="user-menu"
				aria-haspopup="true"
				onClick={(e: any) => {
					setAnchorElement(e.target);
					setIsMenuOpen(!isMenuOpen);
				}}
			>
				{name.split("")[0]}
			</Avatar>
			<Menu
				id="user-menu"
				open={isMenuOpen}
				anchorEl={anchorElement}
				onClose={() => setIsMenuOpen(false)}
			>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</div>
	);
};

export default UserHeader;
