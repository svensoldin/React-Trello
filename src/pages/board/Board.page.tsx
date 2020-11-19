import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useAuthState } from "../../context/index";
import { Board } from "../../App";

type Props = {
	boards: Array<Board>;
};

const BoardPage = ({ boards }: Props) => {
	const user = useAuthState();
	const params = useParams<{ boardId: string }>();
	const board = boards.find((board) => params.boardId === board._id);
	return user.token && board ? (
		<div>{board.users}</div>
	) : (
		<Redirect to={"/"} />
	);
};

export default BoardPage;
