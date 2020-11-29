import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthState } from "../../context/index";
import { Board } from "../../App";

// Get all the user's boards here and lift them up to the App component.

type Props = {
	setBoards: React.Dispatch<React.SetStateAction<Board[] | undefined>>;
	boards: Board[] | undefined;
};

const UserPage = ({ setBoards, boards }: Props) => {
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
	}, [token, userId]);
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
