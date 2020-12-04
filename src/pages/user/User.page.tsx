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

const UserPage = () => {
	const [boards, setBoards] = React.useState<Board[] | undefined>();
	// Pull user info from context
	const user = useAuthState();
	const token = user.token;
	const userId = user.userDetails.id;

	// Fetch boards from API
	React.useEffect(() => {
		const getAllBoards = async () => {
			try {
				const res = await axios.get<Board[]>(
					`${process.env.REACT_APP_SERVER_URL}/users/${userId}`,
					{
						headers: {
							"x-auth-token": token,
						},
					}
				);
				const boards = res.data;
				setBoards(boards);
				return;
			} catch (err) {
				console.log(err);
			}
		};
		getAllBoards();
	}, [token, userId, setBoards]);
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
