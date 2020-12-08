import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useAuthState } from "../../context/index";

import { getBoardById } from "../../utils/utils";

//Components
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
	const [board, setBoard] = React.useState<Board | undefined>();
	const { boardId } = useParams<{ boardId: string }>();

	React.useEffect(() => {
		getBoardById(setBoard, boardId);
	}, [boardId]);
	return board ? (
		<div className="column-container">
			{board.columns.map((column, i) => (
				<BoardColumn
					key={i}
					title={column.title}
					columnId={column._id}
				></BoardColumn>
			))}
		</div>
	) : (
		<h2>Loading</h2>
	);
};

export default BoardPage;
