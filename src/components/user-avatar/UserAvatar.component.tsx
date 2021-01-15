import * as React from "react";
import axios from "axios";

import Avatar from "@material-ui/core/Avatar";

import { useProfilePicture } from "../../utils/utils";
import "./UserAvatar.styles.css";

type Props = {
	userId: string;
};

const UserAvatar = ({ userId }: Props) => {
	const { pictureUrl } = useProfilePicture(userId);
	return <Avatar src={pictureUrl} alt="user" className="user-avatar"></Avatar>;
};

export default UserAvatar;
