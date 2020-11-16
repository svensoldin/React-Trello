import * as React from "react";
import { handleLogin } from "../../utils/login";

const { useState } = React;

const LoginForm = () => {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const { email, password } = credentials;
	// Put the form input in the state
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};
	// Trigger login API call with the credentials stored in the state
	const triggerLogin = (e: React.SyntheticEvent<any>) => {
		handleLogin(e, email, password);
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
