import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useAuthState } from "../../context/index";

import BoardThumbnail from "../../components/board-thumbnail/BoardThumbnail.component";

import "./User.styles.css";

type Board = {
	title: string;
	columns: Array<string>;
	photo: string;
	users: Array<string>;
	admins: Array<string>;
	_id: string;
};

async function getAllBoards(
	id: string,
	setBoards: React.Dispatch<React.SetStateAction<Board[] | undefined>>
) {
	try {
		const res = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/users/${id}`,
			{
				withCredentials: true,
			}
		);
		const boards = res.data;
		setBoards(boards);
	} catch (err) {
		console.log(err);
	}
}

const UserPage = () => {
	const [boards, setBoards] = React.useState<Board[] | undefined>();
	// Pull user info from context
	const {
		userDetails: { id },
	} = useAuthState();

	// Fetch boards from API
	React.useEffect(() => {
		getAllBoards(id, setBoards);
	}, [id, setBoards]);
	return boards ? (
		<>
			<h2>My boards</h2>
			{boards.map((board, i) => (
				<BoardThumbnail key={i} title={board.title} id={board._id} />
			))}
		</>
	) : (
		<h2>Loading...</h2>
	);
};

export default UserPage;
