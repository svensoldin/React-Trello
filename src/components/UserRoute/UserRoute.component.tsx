import * as React from "react";
import UserPage from "../../pages/user/User.page";
import LoginRegisterPage from "../../pages/login-register/LoginRegister.page";
import { useAuthState } from "../../context/index";

const UserRoute = () => {
	// Pull the user from context
	const user = useAuthState();
	// If a user is authenticated, return the UserPage component, else the login page
	return user.token ? <UserPage /> : <LoginRegisterPage />;
};

export default UserRoute;
