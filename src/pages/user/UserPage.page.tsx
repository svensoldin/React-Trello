import React from "react";
import axios from "axios";

// Get all the user's boards here and lift them up.

type Props = {
	userId: string;
	token: string;
};

interface IBoard {
	title: string;
	columns: Array<any>;
	admins: Array<string>;
	users: Array<string>;
}

const UserPage = ({ userId, token }: Props) => {
	const [boards, setBoards] = React.useState<IBoard[]>([]);
	React.useEffect(() => {
		const getAllBoards = async () => {
			try {
				const res = await axios.get<IBoard[]>(
					`${process.env.REACT_APP_SERVER_URL}/users/${userId}`,
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
