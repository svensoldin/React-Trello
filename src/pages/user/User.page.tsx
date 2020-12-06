import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthState } from "../../context/index";

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
		<ul>
			{boards.map((board, i) => (
				<Link key={i} to={`/boards/${board._id}`}>
					{board.title}
				</Link>
			))}
		</ul>
	) : (
		<h2>Loading...</h2>
	);
};

export default UserPage;
