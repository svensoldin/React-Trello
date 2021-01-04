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
	index: number;
};

const CardThumbnail = ({ card, index }: Props) => {
	return (
		<Draggable draggableId={card._id} index={index}>
			{(provided) => {
				return (
					<div
						className="card-thumbnail"
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<p className="card-thumbnail-content">{card.title}</p>
					</div>
				);
			}}
		</Draggable>
	);
};

export default CardThumbnail;
