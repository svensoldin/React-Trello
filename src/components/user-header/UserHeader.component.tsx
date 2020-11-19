import React from "react";
import { useAuthDispatch, logout } from "../../context/index";

type Props = {
	name: string;
};

const UserHeader = ({ name }: Props) => {
	const dispatch = useAuthDispatch();
	const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		logout(dispatch);
	};
	return (
		<div>
			<p>{name}</p>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default UserHeader;
