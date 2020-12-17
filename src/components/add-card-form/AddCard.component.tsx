import * as React from "react";

import "./AddCard.styles.css";

const AddCard = () => {
	return (
		<form className="add-card-form">
			<label className="form-label">Card title</label>
			<input
				className="form-input"
				type="text"
				placeholder="Add a card title"
				required
			/>
			<label className="form-label">Description</label>
			<textarea
				className="form-input description"
				placeholder="Add a description.."
			/>
		</form>
	);
};

export default AddCard;
