import * as React from "react";
import { loginUser, useAuthDispatch } from "../../context/index";

import "./LoginForm.styles.css";

// Refactor idea: separating the logic (API call) in a container and the actual form in a component

const LoginForm = () => {
	const [credentials, setCredentials] = React.useState({
		email: "",
		password: "",
	});
	const { email, password } = credentials;
	// Put the form input in the state
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	// Get Dispatch from context
	const dispatch = useAuthDispatch();

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
					<label htmlFor="email" className="label">
						Email
					</label>
					<input
						aria-label="email-input"
						id="email"
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
					<label htmlFor="password" className="label">
						Password
					</label>
					<input
						aria-label="password-input"
						id="password"
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
				<p>For testing, you can use: john@gmail.com / 12345678</p>
			</form>
		</div>
	);
};

export default LoginForm;
