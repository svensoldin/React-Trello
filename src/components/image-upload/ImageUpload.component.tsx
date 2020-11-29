import * as React from "react";
import axios from "axios";

import ImageUploader from "react-images-upload";

import "./ImageUpload.styles.css";

const ImageUpload = () => {
	const [picture, setPicture] = React.useState();

	const onDrop = (picture: any) => {
		setPicture(picture);
	};

	return (
		<div className="image-upload">
			<ImageUploader
				withPreview={true}
				withIcon={true}
				onChange={onDrop}
				singleImage={true}
			/>
			<button>UPLOAD</button>
		</div>
	);
};

export default ImageUpload;
