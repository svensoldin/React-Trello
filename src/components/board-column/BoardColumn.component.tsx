import * as React from "react";

import { Droppable } from "react-beautiful-dnd";
import CardThumbnail from "../../components/card-thumbnail/CardThumbnail.component";
import AddButton from "../../components/add-btn/AddButton.component";
import EditableTitle from "../../components/editable-title/EditableTitle.component";
import { ReactComponent as MenuIcon } from "../../assets/menu.svg";

import "./BoardColumn.styles.css";

type Card = {
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
	cards: Card[];
};

const BoardColumn = ({ title, columnId, cards }: Props) => {
	return (
		<Droppable droppableId={columnId} type="cards">
			{(provided) => {
				return (
					<section
						className="column"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						<header className="column-title-container">
							<EditableTitle title={title} columnId={columnId} />
							<MenuIcon className="menu-icon" />
						</header>
						{cards?.map((card: Card, i: number) => {
							return (
								<CardThumbnail card={card} index={i} key={card._id} />
							);
						})}
						{provided.placeholder}
					</section>
				);
			}}
		</Droppable>
	);
};

export default BoardColumn;
