import * as React from "react";
import UserPage from "../../pages/user/User.page";
import LoginRegisterPage from "../../pages/login-register/LoginRegister.page";
import { useAuthState } from "../../context/index";
import { Board } from "../../App";

type Props = {
	setBoards: React.Dispatch<React.SetStateAction<Board[] | undefined>>;
	boards: Board[] | undefined;
	setCurrentBoard: React.Dispatch<React.SetStateAction<Board | undefined>>;
};

const UserRoute = ({ setCurrentBoard, ...props }: Props) => {
	// Pull the user from context
	const user = useAuthState();
	// Reset the current board so that the title is not displayed in the header
	React.useEffect(() => setCurrentBoard(undefined));
	// If a user is authenticated, return the UserPage component, else the login page
	return user.token ? <UserPage {...props} /> : <LoginRegisterPage />;
};

export default UserRoute;
