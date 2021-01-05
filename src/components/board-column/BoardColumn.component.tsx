import * as React from "react";
import axios from "axios";

import { Droppable } from "react-beautiful-dnd";
import CardThumbnail from "../../components/card-thumbnail/CardThumbnail.component";
import AddButton from "../../components/add-btn/AddButton.component";

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
};

const BoardColumn = ({ title, columnId }: Props) => {
	// const [cards, setCards] = React.useState<Card[]>([]);
	// const [isLoading, setIsLoading] = React.useState(false);
	const url = `${process.env.REACT_APP_SERVER_URL}/cards/${columnId}`;
	// React.useEffect(() => {
	// 	const fetchCards = async () => {
	// 		setIsLoading(true);
	// 		try {
	// 			const res = await axios.get(url, { withCredentials: true });
	// 			setCards(res.data);
	// 		} catch (err) {
	// 			console.error(err);
	// 		}
	// 		setIsLoading(false);
	// 	};
	// 	fetchCards();
	// }, [url]);
	const {
		data: { cards },
		isLoading,
		refetch,
	} = useFetchAndRefetch(url);

	return !isLoading ? (
		cards ? (
			<Droppable droppableId={columnId} type="cards">
				{(provided) => {
					return (
						<div
							className="column"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							<h2 className="column-title">{title}</h2>
							{cards.map((card: Card, i: number) => {
								return (
									<CardThumbnail
										card={card}
										index={i}
										key={card._id}
									/>
								);
							})}
							{provided.placeholder}
							<AddButton
								id={columnId}
								elementToAdd="card"
								refetch={refetch}
							/>
						</div>
					);
				}}
			</Droppable>
		) : (
			<span>Oops something went wrong</span>
		)
	) : (
		<h2>Loading</h2>
	);
};

export default BoardColumn;
