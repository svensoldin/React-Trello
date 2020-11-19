import * as React from "react";
import UserPage, { Props } from "../../pages/user/User.page";
import LoginRegisterPage from "../../pages/login-register/LoginRegister.page";
import { useAuthState } from "../../context/index";

const UserRoute = ({ setBoards, boards }: Props) => {
	const user = useAuthState();
	return user.token ? (
		<UserPage setBoards={setBoards} boards={boards} />
	) : (
		<LoginRegisterPage />
	);
};

export default UserRoute;
