import * as React from "react";
import UserPage from "../../pages/user/User.page";
import LoginRegisterPage from "../../pages/login-register/LoginRegister.page";
import { useAuthState } from "../../context/index";

const UserRoute = () => {
	// Pull the user from context
	const { userDetails } = useAuthState();
	// If a user is authenticated, return the UserPage component, else the login page
	return userDetails.id ? <UserPage /> : <LoginRegisterPage />;
};

export default UserRoute;
