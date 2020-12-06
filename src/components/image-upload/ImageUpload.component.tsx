import * as React from "react";
import axios from "axios";

import "./ImageUpload.styles.css";

const ImageUpload = () => {
	const [picture, setPicture] = React.useState<undefined | any>();

	const onDrop = (e: React.ChangeEvent<any>) => {
		setPicture(e.target.files[0]);
	};

	const handleUpload = async () => {
		const data = new FormData();
		if (!picture) alert("Please select a picture");
		data.append("attachment", picture);
		try {
			await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/users/profile/add`,
				data,
				{ withCredentials: true }
			);
			setPicture(undefined);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="image-upload">
			<input type="file" onChange={onDrop} />
			<button onClick={handleUpload}>UPLOAD</button>
		</div>
	);
};

export default ImageUpload;
