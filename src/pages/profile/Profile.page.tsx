import * as React from "react";
import { useAuthState } from "../../context/index";
import { Redirect } from "react-router-dom";

import ImageUpload from "../../components/image-upload/ImageUpload.component";

const ProfilePage = () => {
	const {
		userDetails: { id },
	} = useAuthState();
	return id ? (
		<div className="profile-page">
			<ImageUpload />
		</div>
	) : (
		<Redirect to="/" />
	);
};

export default ProfilePage;
