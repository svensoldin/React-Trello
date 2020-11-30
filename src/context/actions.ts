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
		if (res.data.token) {
			dispatch({
				type: "Login success",
				payload: { token: res.data.token, userDetails: res.data.user },
			});
			return res.data.token;
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
};
