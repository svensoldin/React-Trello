import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getBoardById, useSubscription } from "../../utils/utils";

//Components
import BoardColumn from "../../components/board-column/BoardColumn.component";
import AddButton from "../../components/add-btn/AddButton.component";

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

type QueryResults = {
	data: any;
	isLoading: boolean;
	update: any;
	setUpdate: any;
};

const BoardPage = () => {
	const { boardId } = useParams<{ boardId: string }>();
	// const { data, isLoading }: QueryResults = useQuery(
	// 	["getBoardById", boardId],
	// 	() => getBoardById(boardId)
	// );
	const { isLoading, data, update, setUpdate }: QueryResults = useSubscription(
		getBoardById,
		boardId
	);

	return isLoading ? (
		<span>Loading</span>
	) : data ? (
		<div className="board-page">
			{data.columns.map(({ title, _id }: Column) => (
				<BoardColumn key={_id} title={title} columnId={_id}></BoardColumn>
			))}
			<AddButton
				id={boardId}
				elementToAdd="column"
				isInputOpen={update}
				setIsInputOpen={setUpdate}
			/>
		</div>
	) : (
		<span>Oops something went wrong</span>
	);
};

export default BoardPage;
