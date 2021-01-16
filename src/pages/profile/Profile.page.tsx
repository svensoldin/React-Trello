import * as React from "react";
import { useAuthState } from "../../context/index";

import ImageUpload from "../../components/image-upload/ImageUpload.component";

const ProfilePage = () => {
	const {
		userDetails: { name, email },
	} = useAuthState();
	const [form, setForm] = React.useState({
		name,
		email,
	});

	const handleChange = (e: any) => {
		e.preventDefault();
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		// Make api call to update user info
		try {
		} catch (err) {}
	};
	return (
		<div className="profile-page">
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					value={form.name}
					name="name"
					onChange={handleChange}
				/>
				<label htmlFor="email">Email:</label>
				<input
					type="text"
					value={form.email}
					name="email"
					onChange={handleChange}
				/>
				<button type="submit">Save changes</button>
			</form>
			<ImageUpload />
		</div>
	);
};

export default ProfilePage;
