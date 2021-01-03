import * as React from "react";
import axios from "axios";

import { Draggable } from "react-beautiful-dnd";
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
	provided: any;
	innerRef: any;
};

const BoardColumn = ({ title, columnId, provided, innerRef }: Props) => {
	const [cards, setCards] = React.useState<Card[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const url = `${process.env.REACT_APP_SERVER_URL}/cards/${columnId}`;
	React.useEffect(() => {
		const fetchCards = async () => {
			setIsLoading(true);
			try {
				const res = await axios.get(url, { withCredentials: true });
				setCards(res.data);
			} catch (err) {
				console.error(err);
			}
			setIsLoading(false);
		};
		fetchCards();
	}, [url]);
	// const { data, isLoading, refetch } = useFetchAndRefetch(url);

	return !isLoading ? (
		cards ? (
			<div className="column" {...provided.droppableProps} ref={innerRef}>
				<h2 className="column-title">{title}</h2>
				{cards.map((card: Card, i) => {
					return (
						<Draggable key={card._id} index={i} draggableId={card._id}>
							{(provided) => {
								return (
									<CardThumbnail
										card={card}
										provided={provided}
										innerRef={provided.innerRef}
									/>
								);
							}}
						</Draggable>
					);
				})}
				{provided.placeholder}
				<AddButton id={columnId} elementToAdd="card" refetch={() => {}} />
			</div>
		) : (
			<span>Oops something went wrong</span>
		)
	) : (
		<h2>Loading</h2>
	);
};

export default BoardColumn;
