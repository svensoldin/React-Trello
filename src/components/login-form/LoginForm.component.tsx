import * as React from "react";
import { loginUser, useAuthDispatch } from "../../context/index";

const { useState } = React;

const LoginForm = (props: any) => {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const { email, password } = credentials;
	const dispatch = useAuthDispatch();
	// Put the form input in the state
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};
	// Trigger login API call with the credentials stored in the state
	const triggerLogin = async (e: React.SyntheticEvent<any>) => {
		e.preventDefault();
		let payload = { email, password };
		try {
			const response = await loginUser(dispatch, payload); // loginUser handles all the state changes
			if (!response) return;
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="form-container">
			<form
				className="signin-form"
				onSubmit={triggerLogin}
				autoComplete="off"
			>
				<h3>Sign in</h3>
				<div className="form-field">
					<label className="label">Email</label>
					<input
						type="email"
						name="email"
						required
						value={email}
						onChange={handleChange}
						autoComplete="off"
						className="input"
						placeholder="Enter email"
					/>
				</div>
				<div className="form-field">
					<label className="label">Password</label>
					<input
						type="password"
						name="password"
						required
						value={password}
						onChange={handleChange}
						className="input"
						placeholder="Enter password"
					/>
				</div>
				<button className="button" onClick={triggerLogin}>
					Sign In
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
