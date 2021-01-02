import * as React from "react";

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
};

const CardThumbnail = ({ card }: Props) => {
	const handleDrag = (e: React.DragEvent<any>) => {
		const cardJSON = JSON.stringify(card);
		e.dataTransfer.setData("card", cardJSON);
		e.dataTransfer.effectAllowed = "move";
	};
	return (
		<div className="card-thumbnail" draggable onDragStart={handleDrag}>
			<p className="card-thumbnail-content">{card.title}</p>
		</div>
	);
};

export default CardThumbnail;
