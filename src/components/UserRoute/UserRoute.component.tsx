import * as React from "react";
import UserPage from "../../pages/user/User.page";
import LoginRegisterPage from "../../pages/login-register/LoginRegister.page";
import { useAuthState } from "../../context/index";

const UserRoute = () => {
	const {
		userDetails: { id },
	} = useAuthState();
	// If a user is authenticated, return the UserPage component, else the login page
	return id ? <UserPage id={id} /> : <LoginRegisterPage />;
};

export default UserRoute;
