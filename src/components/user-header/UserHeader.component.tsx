import React from "react";
import { useAuthDispatch, logout } from "../../context/index";

// Components
import UserDropdown from "../user-dropdown/UserDropdown.component";
import Avatar from "@material-ui/core/Avatar";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import "./UserHeader.styles.css";

type Props = {
	name: string;
};

const UserHeader = ({ name }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [
		anchorElement,
		setAnchorElement,
	] = React.useState<HTMLElement | null>();

	const dispatch = useAuthDispatch();
	const handleLogout = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		// Call the logout function with dispatch as an arg
		logout(dispatch);
		setIsMenuOpen(false);
	};
	return (
		<ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
			<div className="user-header">
				<Avatar
					className="avatar"
					alt={name}
					aria-haspopup="true"
					onClick={(e: any) => {
						setAnchorElement(e.target);
						setIsMenuOpen(!isMenuOpen);
					}}
				>
					{name.split("")[0]}
				</Avatar>
				<Popper open={isMenuOpen} anchorEl={anchorElement}>
					<UserDropdown handleLogout={handleLogout} />
				</Popper>
			</div>
		</ClickAwayListener>
	);
};

export default UserHeader;
