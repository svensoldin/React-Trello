import * as React from "react";
import axios from "axios";

// Drag'n drop
import { DragDropContext, DropResult } from "react-beautiful-dnd";

//Hooks
import { useParams } from "react-router-dom";
// import { useFetchAndRefetch } from "../../utils/utils";

//Components
import BoardColumn from "../../components/board-column/BoardColumn.component";
import AddButton from "../../components/add-btn/AddButton.component";

import "./Board.styles.css";

type Column = {
	board: string;
	title: string;
	cards: Array<any>; //Card
	_id: string;
};

type Board = {
	title: string;
	columns: Array<Column>;
	admins: Array<string>;
	users: Array<string>;
	_id: string;
};

// type HookReturns = {
// 	data: Board | undefined;
// 	isLoading: boolean;
// 	error: any;
// 	refetch: React.Dispatch<React.SetStateAction<any>>;
// };

const BoardPage = () => {
	const { boardId } = useParams<{ boardId: string }>();
	const url = `${process.env.REACT_APP_SERVER_URL}/boards/${boardId}`;
	const [columns, setColumns] = React.useState<Column[]>([]);
	React.useEffect(() => {
		const fetchBoard = async (url: string) => {
			try {
				const res = await axios.get(url, { withCredentials: true });
				setColumns(res.data.columns);
			} catch (err) {
				console.error(err);
			}
		};
		fetchBoard(url);
	}, [url]);

	const handleDragEnd = async ({
		source,
		destination,
		draggableId,
	}: DropResult) => {
		if (!destination) return;
		const newColumns = Array.from(columns);
		if (destination.droppableId === source.droppableId) {
			const { cards } = newColumns.find(
				(column) => column._id === destination.droppableId
			) as Column;
			const [reorderedCard] = cards.splice(source.index, 1);
			cards.splice(destination.index, 0, reorderedCard);
			setColumns(newColumns);

			// Update DB
		}
		if (destination.droppableId !== source.droppableId) {
			// 1) Change UI

			// Find the source and destination columns
			const sourceColumn = newColumns.find(
				(column) => column._id === source.droppableId
			) as Column;
			const destinationColumn = newColumns.find(
				(column) => column._id === destination.droppableId
			) as Column;
			// Pull the card from source column
			const [reorderedCard] = sourceColumn.cards.splice(source.index, 1);
			// Add to the destination column
			destinationColumn.cards.splice(destination.index, 0, reorderedCard);
			// Update state
			setColumns(newColumns);

			//Update DB
			try {
				const res = await axios.patch(
					`${process.env.REACT_APP_SERVER_URL}/columns/drag/${source.droppableId}/${draggableId}`,
					destination,
					{ withCredentials: true }
				);
				if (res.status === 200) console.log("success");
			} catch (err) {
				console.error(err);
			}
		}
	};
	return (
		<div className="board-page">
			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="columns">
					{columns
						? columns.map(({ title, _id, cards }: Column) => {
								return (
									<BoardColumn
										title={title}
										columnId={_id}
										key={_id}
										cards={cards}
									></BoardColumn>
								);
						  })
						: null}
					<AddButton
						id={boardId}
						elementToAdd="column"
						refetch={() => {}}
					/>
				</div>
			</DragDropContext>
		</div>
	);
};

export default BoardPage;
