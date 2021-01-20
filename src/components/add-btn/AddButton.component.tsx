import * as React from "react";

import { createCardOrColumn } from "../../utils/mutations";

import AddIcon from "@material-ui/icons/Add";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import "./AddButton.styles.css";

type Props = {
	id: string;
	type: "column" | "card";
	addFunction: (type: string, title: string, id?: string) => void;
};

const AddButton = ({ id, type, addFunction }: Props) => {
	// Refactor: merge the two states in one object ?
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
		await createCardOrColumn(type, id, title); // Add to DB
		addFunction(type, title, id); // Add to UI
		setIsInputOpen(false);
		setTitle("");
	};
	return !isInputOpen ? (
		<div
			className={`add-btn ${type === "column" ? "add-column" : "add-card"}`}
			onClick={() => setIsInputOpen(true)}
		>
			<AddIcon />
			<p className="add-text">New {type}</p>
		</div>
	) : (
		<ClickAwayListener onClickAway={handleEvent}>
			<form onSubmit={handleEvent}>
				<input
					type="text"
					className={
						type === "column" ? "add-column-form" : "add-card-form"
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
