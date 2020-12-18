import * as React from "react";
import { getCardsFromColumn } from "../../utils/utils";

import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import CardThumbnail from "../../components/card-thumbnail/CardThumbnail.component";
import AddCard from "../../components/add-card-form/AddCard.component";

import "./BoardColumn.styles.css";

export type Card = {
	title: string;
	comments: Array<Comment> | [];
	labels: Array<{ body: string; color: string }> | [];
	attachments: Array<{ fileName: string }> | [];
	_id: string;
};

type Comment = {
	body: string;
	user: string;
};

type Props = {
	title: string;
	columnId: string;
};

// Styles for Modal component
const centerStyles = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

const BoardColumn = ({ title, columnId }: Props) => {
	const [cards, setCards] = React.useState<Array<Card> | undefined>();
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	React.useEffect(() => {
		getCardsFromColumn(setCards, columnId);
	}, [columnId, isModalOpen]);
	return cards ? (
		<div className="column">
			<h2 className="column-title">{title}</h2>
			{cards.map((card) => (
				<CardThumbnail key={card._id} card={card}></CardThumbnail>
			))}
			<div className="add-card" onClick={() => setIsModalOpen(true)}>
				<AddIcon className="add-icon" />
				<p className="add-card-text">Add another card</p>
			</div>
			<Modal
				style={centerStyles}
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			>
				<div>
					<AddCard columnId={columnId} setIsModalOpen={setIsModalOpen} />
				</div>
			</Modal>
		</div>
	) : (
		<h2>Loading</h2>
	);
};

export default BoardColumn;
