import * as React from "react";
import UserPage from "../../pages/user/UserPage.page";
import LoginRegisterPage from "../../pages/login-register/LoginRegister.page";
import { useAuthState } from "../../context/index";

const UserRoute = () => {
	const user = useAuthState();
	return user.token ? <UserPage /> : <LoginRegisterPage />;
};

export default UserRoute;
