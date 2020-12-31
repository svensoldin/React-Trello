import * as React from "react";
import { useDrag } from "react-dnd";

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
	const [{ isDragging }, drag] = useDrag({
		item: { type: "card" },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	return (
		<div className="card-thumbnail" ref={drag}>
			<p className="card-thumbnail-content">{card.title}</p>
		</div>
	);
};

export default CardThumbnail;
