import * as React from "react";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import "./styles.css";

type Props = {
	title: string;
};

const EditableTitle = ({ title }: Props) => {
	const [isInputOpen, setIsInputOpen] = React.useState(false);
	const [stateTitle, setStateTitle] = React.useState(title);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setStateTitle(e.target.value);
	};

	const handleClickAway = () => {
		setIsInputOpen(false);
		// Trigger API call to change title
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			{isInputOpen ? (
				<input
					type="text"
					value={stateTitle}
					onChange={handleChange}
					className="column-title"
					autoFocus={true}
				/>
			) : (
				<h2 onClick={() => setIsInputOpen(true)} className="column-title">
					{stateTitle}
				</h2>
			)}
		</ClickAwayListener>
	);
};

export default EditableTitle;
