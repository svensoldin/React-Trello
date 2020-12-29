import React from "react";
import axios from "axios";

type Card = {
	title: string;
	comments: Array<Comment> | [];
	labels: Array<{ body: string; color: string }> | [];
	attachments: Array<{ fileName: string }> | [];
	_id: string;
};

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

axios.defaults.withCredentials = true;

// Queries

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

export async function getPicture() {
	const url = `${process.env.REACT_APP_SERVER_URL}/users/profile`;
	try {
		const res = await axios.post(
			url,
			{},
			{
				responseType: "blob",
				withCredentials: true,
			}
		);
		const blob = res.data;
		const pictureURL = URL.createObjectURL(blob);
		return pictureURL;
	} catch (err) {
		console.error(err);
		return err;
	}
}

// Mutations

export const createCard = async (columnId: string, title: string) => {
	try {
		await axios.patch(
			`${process.env.REACT_APP_SERVER_URL}/columns/${columnId}/card/add`,
			{ title },
			{ withCredentials: true }
		);
	} catch (err) {
		return err;
	}
};

export const createColumn = async (boardId: string, title: string) => {
	const url = `${process.env.REACT_APP_SERVER_URL}/boards/${boardId}/column/add`;
	try {
		await axios.patch(url, { title }, { withCredentials: true });
		return;
	} catch (err) {
		return err.message;
	}
};

// Refactoring ideas: caching
export const useFetchAndRefetch = (url: string) => {
	type Data = undefined | Board | Card[];
	type State = {
		data: Data;
		isLoading: boolean;
		error: any;
	};
	const initialState: State = {
		data: undefined,
		isLoading: false,
		error: null,
	};
	type Action =
		| { type: "FETCH_START" }
		| { type: "FETCH_SUCCESS"; payload: Data }
		| { type: "FETCH_FAIL"; payload: any };
	const [state, dispatch] = React.useReducer(
		(state = initialState, action: Action) => {
			switch (action.type) {
				case "FETCH_START":
					return {
						...state,
						isLoading: true,
					};
				case "FETCH_SUCCESS":
					return {
						...state,
						isLoading: false,
						data: action.payload,
					};
				case "FETCH_FAIL":
					return {
						...state,
						isLoading: false,
						error: action.payload,
					};
				default:
					return state;
			}
		},
		initialState
	);
	const [shouldRefetch, refetch] = React.useState({});

	const fetchFunction = React.useCallback(async () => {
		dispatch({ type: "FETCH_START" });
		try {
			const res = await axios.get(url, { withCredentials: true });
			dispatch({ type: "FETCH_SUCCESS", payload: res.data });
		} catch (err) {
			dispatch({ type: "FETCH_FAIL", payload: err });
		}
	}, [url]);

	React.useEffect(() => {
		fetchFunction();
	}, [fetchFunction, shouldRefetch]);
	const { isLoading, data, error } = state;
	return { data, isLoading, error, refetch };
};
