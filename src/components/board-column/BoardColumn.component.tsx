import * as React from "react";

type Card = {
	board: string;
	columnTitle: string;
	title: string;
	comments: Array<any> | []; // Define this type later
	labels: Array<{ body: string; color: string }> | [];
	attachments: Array<{ fileName: string }> | [];
	_id: string;
};

type Props = {
	title: string;
	cards: Array<Card>;
};

const BoardColumn = ({ title, cards }: Props) => {
	console.log(cards);
	return (
		<div>
			<h2>{title}</h2>
			{cards.map((card) => (
				<p key={card._id}>{card.title}</p>
			))}
		</div>
	);
};

export default BoardColumn;
