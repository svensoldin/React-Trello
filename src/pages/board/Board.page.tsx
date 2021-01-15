import * as React from "react";
import axios from "axios";

// Drag'n drop
import { DragDropContext, DropResult } from "react-beautiful-dnd";

//Hooks
import { useParams } from "react-router-dom";
// import { useFetchAndRefetch } from "../../utils/utils";

//Components
import BoardColumn from "../../components/board-column/BoardColumn.component";
import AddButton from "../../components/add-btn/AddButton.component";
import UserAvatar from "../../components/user-avatar/UserAvatar.component";

import "./Board.styles.css";

type Column = {
	board: string;
	title: string;
	cards: Array<any>; //Card
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
	const { boardId } = useParams<{ boardId: string }>();
	const [board, setBoard] = React.useState<Board>();
	React.useEffect(() => {
		const fetchBoard = async () => {
			const url = `${process.env.REACT_APP_SERVER_URL}/boards/${boardId}`;

			try {
				const res = await axios.get<Board>(url, { withCredentials: true });
				setBoard(res.data);
				// setColumns(res.data.columns);
				// setUsers(res.data.users);
			} catch (err) {
				console.error(err);
			}
		};
		fetchBoard();
	}, [boardId]);

	const handleDragEnd = async ({
		source,
		destination,
		draggableId,
	}: DropResult) => {
		if (!destination) return;
		const newBoard = { ...board } as Board;
		// Create new array not to mutate the state
		// const newColumns = Array.from(columns);

		// 1) Change UI

		// Find the source and destination columns
		const sourceColumn = newBoard.columns.find(
			(column) => column._id === source.droppableId
		) as Column;
		const destinationColumn = newBoard.columns.find(
			(column) => column._id === destination.droppableId
		) as Column;
		// const destinationColumn = newColumns.find(
		// 	(column) => column._id === destination.droppableId
		// ) as Column;
		// Remove the card from source
		const [reorderedCard] = sourceColumn.cards.splice(source.index, 1);
		// Add to the destination
		destinationColumn.cards.splice(destination.index, 0, reorderedCard);
		// Update state
		setBoard(newBoard);
		// setColumns(newColumns);

		// 2) Update DB
		try {
			const res = await axios.patch(
				`${process.env.REACT_APP_SERVER_URL}/columns/drag/${source.droppableId}/${draggableId}`,
				destination,
				{ withCredentials: true }
			);
			if (res.status === 200) console.log("success");
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<main className="board-page">
			<div className="board-users">
				<h3 className="board-title">{board?.title}</h3>
				{board?.users.map((user) => {
					return <UserAvatar userId={user} key={user} />;
				})}
			</div>
			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="columns">
					{board?.columns.map(({ title, _id, cards }: Column) => {
						return (
							<BoardColumn
								title={title}
								columnId={_id}
								key={_id}
								cards={cards}
							></BoardColumn>
						);
					})}
					<AddButton id={boardId} type="column" refetch={() => {}} />
				</div>
			</DragDropContext>
		</main>
	);
};

export default BoardPage;
