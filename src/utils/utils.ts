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

export async function getAllBoards(id: string) {
	try {
		const res = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/users/${id}`,
			{
				withCredentials: true,
			}
		);
		return res.data;
	} catch (err) {
		return err;
	}
}

export async function getBoardById(boardId: string) {
	const url = `${process.env.REACT_APP_SERVER_URL}/boards/${boardId}`;
	try {
		const res = await axios.get(url, { withCredentials: true });
		return res.data;
	} catch (err) {
		return err;
	}
}

export async function getCardsFromColumn(columnId: string) {
	try {
		const res = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/cards/${columnId}`,
			{ withCredentials: true }
		);
		const cards = res.data;
		return cards;
	} catch (err) {
		console.error(err);
		return err;
	}
}

export const createColumn = async (boardId: string, title: string) => {
	const url = `${process.env.REACT_APP_SERVER_URL}/boards/${boardId}/column/add`;
	try {
		await axios.patch(url, { title }, { withCredentials: true });
		return;
	} catch (err) {
		return err.message;
	}
};
