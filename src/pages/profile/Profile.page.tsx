import * as React from "react";
import { useAuthState } from "../../context/index";
import { Redirect } from "react-router-dom";

import ImageUpload from "../../components/image-upload/ImageUpload.component";

const ProfilePage = () => {
	const user = useAuthState();
	const token = user.token;
	return user.token ? (
		<div className="profile-page">
			<ImageUpload token={token} />
		</div>
	) : (
		<Redirect to="/" />
	);
};

export default ProfilePage;
