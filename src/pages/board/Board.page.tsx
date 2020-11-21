import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useAuthState } from "../../context/index";
import { Board } from "../../App";

//Components
import BoardColumn from "../../components/board-column/BoardColumn.component";

type Props = {
	boards: Board[] | undefined;
	setCurrentBoard: React.Dispatch<React.SetStateAction<Board | undefined>>;
};

const BoardPage = ({ boards, setCurrentBoard }: Props) => {
	const user = useAuthState();
	const params = useParams<{ boardId: string }>();
	let board;
	boards
		? (board = boards.find((board) => params.boardId === board._id))
		: (board = board);
	setCurrentBoard(board);
	return boards && user.token && board ? (
		<React.Fragment>
			{board.columns.map((column) => (
				<BoardColumn
					key={column._id}
					title={column.title}
					cards={column.cards}
				></BoardColumn>
			))}
		</React.Fragment>
	) : (
		<Redirect to={"/"} />
	);
};

export default BoardPage;
