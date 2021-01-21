import * as React from "react";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

type Props = {
	children: React.ReactElement<any>;
	updaterFunction: (text: string) => Promise<void>;
};

const EditableElement = ({ children, updaterFunction }: Props) => {
	if (!children)
		throw new Error("EditableElement component must have children");
	const [isInputOpen, setIsInputOpen] = React.useState(false);
	const [text, setText] = React.useState(children.props.children); // The inner text of the element

	const handleClickAway = () => {
		setIsInputOpen(false);
		// If the text was changed
		if (text !== children.props.children) {
			// API call
			updaterFunction(text);
		}
	};

	return isInputOpen ? (
		<ClickAwayListener onClickAway={handleClickAway}>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				className={children.props.className}
				autoFocus={true}
			/>
		</ClickAwayListener>
	) : (
		<>
			{React.cloneElement(children, {
				...children.props,
				onClick: () => {
					setIsInputOpen(true);
					console.log(isInputOpen);
				},
			})}
		</>
	);
};

export default EditableElement;
