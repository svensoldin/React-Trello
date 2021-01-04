import * as React from "react";

// Drag'n drop
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

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
	const url = `${process.env.REACT_APP_SERVER_URL}/boards/${boardId}`;
	const { data, isLoading, refetch }: HookReturns = useFetchAndRefetch(url);

	const handleDragEnd = (result: DropResult) => {};

	return isLoading ? (
		<span>Loading</span>
	) : data ? (
		<div className="board-page">
			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="columns">
					{data.columns.map(({ title, _id }: Column) => {
						return (
							<BoardColumn title={title} columnId={_id}></BoardColumn>
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
