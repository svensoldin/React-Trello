import { Dispatch } from "./reducer";
import axios from "axios";

type Credentials = {
	email: string;
	password: string;
};

export const loginUser = async (
	dispatch: Dispatch,
	loginPayload: Credentials
) => {
	dispatch({ type: "Login start" });
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/users/signin`,
			loginPayload
		);
		if (res.status === 200) {
			dispatch({
				type: "Login success",
				payload: { userDetails: res.data.user },
			});
			localStorage.setItem("user", JSON.stringify(res.data.user));
			return res.data.user;
		}
		if (res.data.errors)
			dispatch({ type: "Login fail", payload: res.data.errors });
	} catch (err) {
		console.error(err);
		dispatch({ type: "Login fail", payload: err });
	}
};

export const logout = async (dispatch: Dispatch) => {
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/users/logout`,
			{}
		);
		if (res.status === 200) {
			dispatch({ type: "Logout" });
			localStorage.removeItem("user");
		}
	} catch (err) {
		console.error(err);
	}
};
