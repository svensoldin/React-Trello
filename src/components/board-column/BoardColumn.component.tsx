import * as React from "react";
import axios from "axios";

import { Droppable, Draggable } from "react-beautiful-dnd";
import CardThumbnail from "../../components/card-thumbnail/CardThumbnail.component";
import AddButton from "../../components/add-btn/AddButton.component";
import EditableTitle from "../../components/editable-title/EditableTitle.component";

import { useFetchAndRefetch } from "../../utils/utils";

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
					<div
						className="column"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						<EditableTitle title={title} columnId={columnId} />
						{cards?.map((card: Card, i: number) => {
							return (
								<CardThumbnail card={card} index={i} key={card._id} />
							);
						})}
						{provided.placeholder}
						<AddButton
							id={columnId}
							type="card"
							refetch={() => {}} /* Add the card via state, this is an antipattern*/
						/>
					</div>
				);
			}}
		</Droppable>
	);
};

export default BoardColumn;
