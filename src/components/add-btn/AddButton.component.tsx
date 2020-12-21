import * as React from "react";

import { createColumn, createCard } from "../../utils/utils";

import AddIcon from "@material-ui/icons/Add";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import "./AddButton.styles.css";

type Props = {
	id: string;
	elementToAdd: "column" | "card";
};

const AddButton = ({ id, elementToAdd }: Props) => {
	const [isInputOpen, setIsInputOpen] = React.useState(false);
	const [title, setTitle] = React.useState("");
	const handleEvent = (
		e:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<Document, MouseEvent>
	) => {
		e.preventDefault();
		if (!title.length) return setIsInputOpen(false);
		if (elementToAdd === "column") createColumn(id, title);
		if (elementToAdd === "card") createCard(id, title);
		// Hide the input
		setIsInputOpen(false);
		setTitle("");
		// Re-render parent component
	};
	return !isInputOpen ? (
		<div
			className={`add-btn ${
				elementToAdd === "column" ? "add-column" : "add-card"
			}`}
			onClick={() => setIsInputOpen(true)}
		>
			<AddIcon />
			<p className="add-text">New {elementToAdd}</p>
		</div>
	) : (
		<ClickAwayListener onClickAway={handleEvent}>
			<form onSubmit={handleEvent}>
				<input
					type="text"
					className={
						elementToAdd === "column"
							? "add-column-form"
							: "add-card-form"
					}
					autoFocus={true}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</form>
		</ClickAwayListener>
	);
};

export default AddButton;
