import * as React from "react";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";

type Props = {
	children: React.ReactElement<any>;
	updaterFunction: (text: string, id: string, field: string) => Promise<void>;
	inputStyles?: React.CSSProperties;
	id: string;
	field: string;
};

const EditableElement = ({
	children,
	updaterFunction,
	inputStyles,
	id,
	field,
}: Props) => {
	if (!children)
		throw new Error("EditableElement component must have children");
	const [isInputOpen, setIsInputOpen] = React.useState(false);
	const [text, setText] = React.useState(children.props.children); // The inner text of the element

	const handleClickAway = () => {
		setIsInputOpen(false);
		// If the text was changed
		if (text !== children.props.children) {
			// API call
			updaterFunction(text, id, field);
		}
	};

	return isInputOpen ? (
		<ClickAwayListener onClickAway={handleClickAway}>
			<textarea
				value={text}
				onChange={(e) => setText(e.target.value)}
				className={children.props.className}
				style={inputStyles}
				autoFocus={true}
				onKeyUp={({ key }) => {
					if (key === "Enter") handleClickAway();
				}}
			/>
		</ClickAwayListener>
	) : (
		<>
			{React.cloneElement(children, {
				...children.props,
				onClick: () => {
					setIsInputOpen(true);
				},
				children: text,
			})}
		</>
	);
};

export default EditableElement;
