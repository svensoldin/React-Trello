import * as React from "react";
import { getCardsFromColumn } from "../../utils/utils";
import { useQuery } from "react-query";

import CardThumbnail from "../../components/card-thumbnail/CardThumbnail.component";
import AddButton from "../../components/add-btn/AddButton.component";

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

type QueryResults = {
	data: Card[] | undefined;
	isLoading: boolean;
};

const BoardColumn = ({ title, columnId }: Props) => {
	// const { data, isLoading }: QueryResults = useQuery(
	// 	["getCardsFromColumn", columnId],
	// 	() => getCardsFromColumn(columnId),
	// 	{ staleTime: 500 }
	// );
	const [data, setData] = React.useState<Card[] | undefined>(undefined);
	const [isLoading, setIsLoading] = React.useState(false);
	const [isInputOpen, setIsInputOpen] = React.useState(false);

	React.useEffect(() => {
		setIsLoading(true);
		getCardsFromColumn(columnId).then((cards) => setData(cards));
		setIsLoading(false);
	}, [columnId, isInputOpen]);

	return !isLoading ? (
		data ? (
			<div className="column">
				<h2 className="column-title">{title}</h2>
				{data.map((card) => (
					<CardThumbnail key={card._id} card={card}></CardThumbnail>
				))}
				<AddButton
					id={columnId}
					elementToAdd="card"
					isInputOpen={isInputOpen}
					setIsInputOpen={setIsInputOpen}
				/>
			</div>
		) : (
			<span>Oops something went wrong</span>
		)
	) : (
		<h2>Loading</h2>
	);
};

export default BoardColumn;
