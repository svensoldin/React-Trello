import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getBoardById } from "../../utils/utils";

//Components
import AddIcon from "@material-ui/icons/Add";
import BoardColumn from "../../components/board-column/BoardColumn.component";

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

const BoardPage = () => {
	const { boardId } = useParams<{ boardId: string }>();
	const { data, isLoading, isError } = useQuery(
		["getBoardById", boardId],
		() => getBoardById(boardId)
	);
	const board = data;
	if (isLoading) {
		return <span>Loading...</span>;
	}
	if (isError) {
		return <span>Oops something went wrong</span>;
	}
	return (
		<div className="columns-container">
			<div className="board-column">
				{board.columns.map(({ title, _id }: Column) => (
					<BoardColumn
						key={_id}
						title={title}
						columnId={_id}
					></BoardColumn>
				))}
			</div>
			<div className="add-column-btn">
				<AddIcon />
				<p className="add-column-text">Add column</p>
			</div>
		</div>
	);
};

export default BoardPage;
