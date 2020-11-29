import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useAuthState } from "../../context/index";
import { Board } from "../../App";

//Components
import BoardColumn from "../../components/board-column/BoardColumn.component";

import "./Board.styles.css";

type Props = {
	boards: Board[] | undefined;
	setCurrentBoard: React.Dispatch<React.SetStateAction<Board | undefined>>;
};

const BoardPage = ({ boards, setCurrentBoard }: Props) => {
	const user = useAuthState();
	const params = useParams<{ boardId: string }>();
	let board: Board | undefined;
	boards
		? (board = boards.find((board) => params.boardId === board._id))
		: (board = undefined);
	React.useEffect(() => {
		setCurrentBoard(board);
	});
	return boards && user.token && board ? (
		<div className="column-container">
			{board.columns.map((column) => (
				<BoardColumn
					key={column._id}
					title={column.title}
					cards={column.cards}
				></BoardColumn>
			))}
		</div>
	) : (
		<Redirect to={"/"} />
	);
};

export default BoardPage;
