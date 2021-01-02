import * as React from "react";
import axios from "axios";

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
	});
	// const { data, isLoading, refetch } = useFetchAndRefetch(url);
	const handleDrop = (e: React.DragEvent<any>) => {
		const cardJSON = e.dataTransfer.getData("card");
		const droppedCard: Card = JSON.parse(cardJSON);
		setCards((cards) => [...cards, droppedCard]);
	};

	const handleDragOver = (e: React.DragEvent<any>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	return isLoading ? (
		cards ? (
			<div
				className="column"
				onDrop={handleDrop}
				onDragOver={handleDragOver}
			>
				<h2 className="column-title">{title}</h2>
				{cards.map((card: Card) => {
					return <CardThumbnail card={card} key={card._id} />;
				})}
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
