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
	return (
		<div className="card-thumbnail">
			<p className="card-thumbnail-content">{card.title}</p>
		</div>
	);
};

export default CardThumbnail;
