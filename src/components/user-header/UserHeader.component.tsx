import React from "react";

type Props = {
	name: string;
};

const UserHeader = ({ name }: Props) => {
	return <p>{name}</p>;
};

export default UserHeader;
