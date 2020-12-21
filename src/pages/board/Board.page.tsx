import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getBoardById } from "../../utils/utils";

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

type QueryResults = {
	data: Board | undefined;
	isLoading: boolean;
};

const BoardPage = () => {
	const { boardId } = useParams<{ boardId: string }>();
	const { data, isLoading }: QueryResults = useQuery(
		["getBoardById", boardId],
		() => getBoardById(boardId)
	);

	return isLoading ? (
		<span>Loading</span>
	) : data ? (
		<div className="columns-container">
			<div className="board-column">
				{data.columns.map(({ title, _id }: Column) => (
					<BoardColumn
						key={_id}
						title={title}
						columnId={_id}
					></BoardColumn>
				))}
			</div>
			<AddButton id={boardId} elementToAdd="column" />
		</div>
	) : (
		<span>Oops something went wrong</span>
	);
};

export default BoardPage;
