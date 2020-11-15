import React from "react";
import UserHeader from "../../components/user-header/UserHeader.component";

import "./Header.styles.css";

type Props = {
	user: { name: string };
	boardName: string;
};

const Header = ({ user, boardName }: Props) => {
	return (
		<div>
			<UserHeader name={user.name} />
		</div>
	);
};

export default Header;
