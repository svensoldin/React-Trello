import * as React from "react";

import { createColumn, createCard } from "../../utils/utils";

import AddIcon from "@material-ui/icons/Add";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import "./AddButton.styles.css";

type Props = {
	id: string;
	elementToAdd: "column" | "card";
	isInputOpen: boolean;
	setIsInputOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddButton = ({
	id,
	elementToAdd,
	isInputOpen,
	setIsInputOpen,
}: Props) => {
	const [title, setTitle] = React.useState("");
	const handleEvent = async (
		e:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<Document, MouseEvent>
	) => {
		e.preventDefault();
		if (!title.length) return setIsInputOpen(false);
		if (elementToAdd === "column") {
			await createColumn(id, title);
			setIsInputOpen(false);
			setTitle("");
		}
		if (elementToAdd === "card") {
			await createCard(id, title);
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
