import * as React from "react";
import { useFetchAndRefetch } from "../../utils/utils";
import { useDrop } from "react-dnd";

import CardThumbnail from "../../components/card-thumbnail/CardThumbnail.component";
import AddButton from "../../components/add-btn/AddButton.component";

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
};

const BoardColumn = ({ title, columnId }: Props) => {
	const url = `${process.env.REACT_APP_SERVER_URL}/cards/${columnId}`;
	const { data, isLoading, refetch } = useFetchAndRefetch(url);
	const [, drop] = useDrop({
		accept: "card",
	});

	return !isLoading ? (
		data ? (
			<div className="column" ref={drop}>
				<h2 className="column-title">{title}</h2>
				{data.map((card: Card) => (
					<CardThumbnail key={card._id} card={card}></CardThumbnail>
				))}
				<AddButton id={columnId} elementToAdd="card" refetch={refetch} />
			</div>
		) : (
			<span>Oops something went wrong</span>
		)
	) : (
		<h2>Loading</h2>
	);
};

export default BoardColumn;
