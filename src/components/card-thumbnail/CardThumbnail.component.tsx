import * as React from "react";

import { Draggable } from "react-beautiful-dnd";
import "./CardThumbnail.styles.css";

type Card = {
	title: string;
	comments: Array<any> | []; // Define this type later
	labels: Array<{ body: string; color: string }> | [];
	attachments: Array<{ fileName: string }> | [];
	_id: string;
};

type Props = {
	card: Card;
	provided: any;
	innerRef: any;
};

const CardThumbnail = ({ card, provided, innerRef }: Props) => {
	return (
		<div
			className="card-thumbnail"
			ref={innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
		>
			<p className="card-thumbnail-content">{card.title}</p>
		</div>
	);
};

export default CardThumbnail;
