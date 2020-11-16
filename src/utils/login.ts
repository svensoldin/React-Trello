import * as React from "react";
import axios from "axios";

// The event is either triggered by the form submission or the clicking of the submit button (two different types of events) hence this typing
export const handleLogin = async (
	e:
		| React.FormEvent<HTMLFormElement>
		| React.MouseEvent<HTMLButtonElement, MouseEvent>,
	email: string,
	password: string
) => {
	e.preventDefault();
	try {
		const res = await axios.post(
			`${process.env.REACT_APP_SERVER_URL}/users/signin`,
			{
				email,
				password,
			}
		);
		if (res.data.errors) return console.log(res.data.errors);
		const token = res.data;
		return token;
	} catch (err) {
		console.log("Something went wrong");
	}
};
