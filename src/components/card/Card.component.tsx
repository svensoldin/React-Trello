import * as React from "react";

import "./styles.css";

type Card = {
	title: string;
	users?: Array<string>;
	comments: Array<any> | []; // Define this type later
	labels: Array<{ body: string; color: string }> | [];
	attachments: Array<{ fileName: string }> | [];
	_id: string;
};

type Props = {
	card: Card;
};

const Card = ({ card }: Props) => {
	const { title, comments, labels, attachments } = card;
	return (
		<section className="card">
			<div className="upper-container">
				<h3>{title}</h3>
			</div>
			<div className="lower-container">
				<div className="card-details">
					<div className="card-description">
						<h3>Description</h3>
						<div></div>
					</div>
					<div className="card-activity">
						<h3>Activity</h3>
					</div>
				</div>
				<div className="card-functions">
					<h3>Add to card</h3>
				</div>
			</div>
		</section>
	);
};

export default Card;
