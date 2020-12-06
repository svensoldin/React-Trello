import axios from "axios";

import { Card } from "../components/board-column/BoardColumn.component";

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

export async function getBoardById(
	setBoard: React.Dispatch<React.SetStateAction<Board | undefined>>,
	boardId: string
) {
	const url = `${process.env.REACT_APP_SERVER_URL}/boards/${boardId}`;
	try {
		const res = await axios.get(url, { withCredentials: true });
		const board = res.data;
		setBoard(board);
	} catch (err) {
		console.error(err);
	}
}

export async function getCardsFromColumn(
	setCards: React.Dispatch<React.SetStateAction<Array<Card> | undefined>>,
	columnId: string
) {
	try {
		const res = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/cards/${columnId}`,
			{ withCredentials: true }
		);
		const cards = res.data;
		setCards(cards);
	} catch (err) {
		console.error(err);
	}
}
