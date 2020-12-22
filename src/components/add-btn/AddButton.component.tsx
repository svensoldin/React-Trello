import * as React from "react";

import { createColumn, createCard } from "../../utils/utils";

import AddIcon from "@material-ui/icons/Add";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import "./AddButton.styles.css";

type Props = {
	id: string;
	elementToAdd: "column" | "card";
	refetch: React.Dispatch<React.SetStateAction<any>>;
};

const AddButton = ({ id, elementToAdd, refetch }: Props) => {
	const [isInputOpen, setIsInputOpen] = React.useState(false);

	// The input is controlled via this state
	const [title, setTitle] = React.useState("");

	// Triggered if input is submitted or if user clicks away
	const handleEvent = async (
		e:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<Document, MouseEvent>
	) => {
		e.preventDefault();
		// Do nothing if card is empty
		if (!title.length) return setIsInputOpen(false);

		// Otherwise, trigger mutations and reset state
		if (elementToAdd === "column") {
			await createColumn(id, title);
			refetch({});
			setIsInputOpen(false);
			setTitle("");
		}
		if (elementToAdd === "card") {
			await createCard(id, title);
			refetch({});
			setIsInputOpen(false);
			setTitle("");
		}
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
