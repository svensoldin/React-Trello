import React from "react";
import axios from "axios";
import { DropResult } from "react-beautiful-dnd";

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

// Refactoring ideas: caching
export const useFetchAndRefetch = (url: string) => {
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
		let mounted = true;
		if (mounted) fetchFunction();
		return () => {
			mounted = false;
		};
	}, [fetchFunction, shouldRefetch]);
	const { isLoading, data, error } = state;
	return { data, isLoading, error, refetch };
};

// const handleDragEnd = async (result: DropResult) => {
// 	if (!data) return;
// 	const {
// 		destination,
// 		source: { droppableId: sourceId }, // renaming while destructuring
// 		draggableId: cardId,
// 	} = result;

// 	// If the card was dropped outside a column
// 	if (!destination) return;

// 	// If the card was dropped within the same column
// 	if (destination.droppableId === sourceId) {
// 		// Need to make endpoint for this
// 	}

// 	// If the card was dropped from one column to another
// 	// Update the DB
// 	try {
// 		const res = await axios.patch(
// 			`${process.env.REACT_APP_SERVER_URL}/columns/drag/${sourceId}/${cardId}`,
// 			destination,
// 			{ withCredentials: true }
// 		);
// 		if (res.status === 200) console.log("success");
// 	} catch (err) {
// 		console.error(err);
// 	}
// };
