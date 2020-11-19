import React from "react";
import axios from "axios";
import { useAuthState } from "../../context/index";

// Get all the user's boards here and lift them up.

interface IBoard {
	title: string;
	columns: Array<any>;
	admins: Array<string>;
	users: Array<string>;
}

const UserPage = () => {
	const [boards, setBoards] = React.useState<IBoard[]>([]);
	const user = useAuthState();
	const token = user.token;
	const userId = user.userDetails.id;
	React.useEffect(() => {
		const getAllBoards = async () => {
			try {
				const res = await axios.get<IBoard[]>(
					`${process.env.REACT_APP_SERVER_URL}users/${userId}`,
					{
						headers: {
							"x-auth-token": token,
						},
					}
				);
				const boards = res.data;
				setBoards(boards);
			} catch (err) {
				console.log(err);
			}
		};
		getAllBoards();
	});
	return boards.length ? (
		<ul>
			{boards.map((board, i) => (
				<li key={i}>{board.title}</li>
			))}
		</ul>
	) : (
		<h2>Loading...</h2>
	);
};

export default UserPage;
