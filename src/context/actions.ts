import { Dispatch } from "./reducer";
import axios from "axios";

interface ICredentials {
	email: string;
	password: string;
}

export const loginUser = async (
	dispatch: Dispatch,
	loginPayload: ICredentials
) => {
	dispatch({ type: "Login start" });
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/users/signin`,
			loginPayload
		);
		if (res.data.token) {
			dispatch({ type: "Login success", payload: res.data });
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("currentUser", JSON.stringify(res.data.user));
		}
		if (res.data.errors)
			dispatch({ type: "Login fail", payload: res.data.errors });
	} catch (err) {
		console.error(err);
		dispatch({ type: "Login fail", payload: err });
	}
};

export const logout = (dispatch: Dispatch) => {
	dispatch({ type: "Logout" });
	localStorage.removeItem("currentUser");
	localStorage.removeItem("token");
};
