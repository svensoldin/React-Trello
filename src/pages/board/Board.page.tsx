import * as React from "react";
import axios from "axios";

// Drag'n drop
import { DragDropContext, DropResult } from "react-beautiful-dnd";

//Hooks
import { useParams } from "react-router-dom";
import { useFetchAndRefetch } from "../../utils/utils";

//Components
import BoardColumn from "../../components/board-column/BoardColumn.component";
import AddButton from "../../components/add-btn/AddButton.component";

import "./Board.styles.css";

type Column = {
	board: string;
	title: string;
	cards: Array<string>;
	_id: string;
};

type Board = {
	title: string;
	columns: Array<Column>;
	admins: Array<string>;
	users: Array<string>;
	_id: string;
};

type HookReturns = {
	data: Board | undefined;
	isLoading: boolean;
	error: any;
	refetch: React.Dispatch<React.SetStateAction<any>>;
};

const BoardPage = () => {
	const { boardId } = useParams<{ boardId: string }>();
	const fetchUrl = `${process.env.REACT_APP_SERVER_URL}/boards/${boardId}`;
	const { data, isLoading, refetch }: HookReturns = useFetchAndRefetch(
		fetchUrl
	);

	const handleDragEnd = async (result: DropResult) => {
		if (!data) return;
		const {
			destination,
			source: { droppableId: sourceId }, // renaming while destructuring
			draggableId: cardId,
		} = result;

		// If the card was dropped outside a column
		if (!destination) return;

		// If the card was dropped in the same column
		if (destination.droppableId === sourceId) {
			// Need to make endpoint for this
		}

		// If the card was dropped from one column to another
		// Update the DB
		try {
			const res = await axios.patch(
				`${process.env.REACT_APP_SERVER_URL}/columns/drag/${sourceId}/${cardId}`,
				destination,
				{ withCredentials: true }
			);
			if (res.status === 200) console.log("success");
		} catch (err) {
			console.error(err);
		}
	};

	return isLoading ? (
		<span>Loading</span>
	) : data ? (
		<div className="board-page">
			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="columns">
					{data.columns.map(({ title, _id }: Column) => {
						return (
							<BoardColumn
								title={title}
								columnId={_id}
								key={_id}
							></BoardColumn>
						);
					})}
					<AddButton
						id={boardId}
						elementToAdd="column"
						refetch={refetch}
					/>
				</div>
			</DragDropContext>
		</div>
	) : (
		<span>Oops something went wrong</span>
	);
};

export default BoardPage;
