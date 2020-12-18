import * as React from "react";
import axios from "axios";

import "./AddCard.styles.css";

const addCardRequest = async (
	columnId: string,
	formValues: { title: string; description: string }
) => {
	try {
		await axios.patch(
			`${process.env.REACT_APP_SERVER_URL}/columns/${columnId}/card/add`,
			formValues,
			{ withCredentials: true }
		);
	} catch (err) {
		console.error(err);
	}
};

type Props = {
	columnId: string;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCard = ({ columnId, setIsModalOpen }: Props) => {
	const [formValues, setFormValues] = React.useState({
		title: "",
		description: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!formValues.title) return alert("The card must have a title");
		await addCardRequest(columnId, formValues);
		setIsModalOpen(false);
	};
	return (
		<>
			<form className="add-card-form" onSubmit={handleSubmit}>
				<label className="form-label">Card title</label>
				<input
					className="form-input"
					type="text"
					placeholder="Add a card title"
					required
					name="title"
					value={formValues.title}
					onChange={handleChange}
				/>
				<label className="form-label">Description</label>
				<input
					type="text"
					className="form-input description"
					placeholder="Add a description.."
					name="description"
					value={formValues.description}
					onChange={handleChange}
				/>
			</form>
			<div className="button-container">
				<button onClick={handleSubmit}>Add card</button>
			</div>
		</>
	);
};

export default AddCard;
