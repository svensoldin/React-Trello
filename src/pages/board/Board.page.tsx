import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useAuthState } from "../../context/index";
import { Board } from "../../App";

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
		: null;
	setCurrentBoard(board);
	return boards && user.token && board ? (
		<div>{board.users}</div>
	) : (
		<Redirect to={"/"} />
	);
};

export default BoardPage;
