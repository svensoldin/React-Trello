import * as React from "react";

import { createColumn } from "../../utils/utils";

import AddIcon from "@material-ui/icons/Add";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import "./AddColumn.styles.css";

type Props = {
	boardId: string;
};

const AddColumn = ({ boardId }: Props) => {
	const [isInputOpen, setIsInputOpen] = React.useState(false);
	const [title, setTitle] = React.useState("");
	const handleEvent = (
		e:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<Document, MouseEvent>
	) => {
		e.preventDefault();
		if (!title.length) return setIsInputOpen(false);
		createColumn(boardId, title);
		setIsInputOpen(false);
	};
	return !isInputOpen ? (
		<div className="add-column-btn" onClick={() => setIsInputOpen(true)}>
			<AddIcon />
			<p className="add-column-text">New column</p>
		</div>
	) : (
		<ClickAwayListener onClickAway={handleEvent}>
			<form onSubmit={handleEvent}>
				<input
					type="text"
					className="add-column-form"
					autoFocus={true}
					placeholder="Enter a column title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</form>
		</ClickAwayListener>
	);
};

export default AddColumn;
