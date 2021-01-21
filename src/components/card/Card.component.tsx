import * as React from "react";

import Dialog from "@material-ui/core/Dialog";
import EditableElement from "../editable-element/EditableElement.component";
import { updateCardDescription } from "../../utils/mutations";

import "./styles.css";

type Card = {
	title: string;
	users?: Array<string>;
	comments: Array<any> | []; // Define this type later
	labels: Array<{ body: string; color: string }> | [];
	attachments: Array<{ fileName: string }> | [];
	description?: string;
	_id: string;
};

type Props = {
	card: Card;
	isModalOpen: boolean;
	closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CardComponent = ({ card, isModalOpen, closeModal }: Props) => {
	const { title, comments, labels, attachments, description } = card;
	return (
		<Dialog
			open={isModalOpen}
			onClose={closeModal}
			className="card-modal"
			maxWidth={false}
		>
			<main className="card">
				<section className="upper-container">
					<h3>{title}</h3>
				</section>
				<section className="lower-container">
					<div className="card-details">
						<div className="card-description-container">
							<h3>Description</h3>
							<EditableElement updaterFunction={updateCardDescription}>
								<p className="card-description">Some text</p>
							</EditableElement>
						</div>
						<div className="card-activity">
							<h3>Activity</h3>
						</div>
					</div>
					<aside className="card-functions">
						<h3>Add to card</h3>
					</aside>
				</section>
			</main>
		</Dialog>
	);
};

export default CardComponent;
