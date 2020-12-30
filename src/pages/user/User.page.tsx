import React from "react";
import { useQuery } from "react-query";
import { getAllBoards } from "../../utils/queries";

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

type Props = {
	id: string;
};

const UserPage = ({ id }: Props) => {
	const { data, isLoading } = useQuery(["getAllBoards", id], () =>
		getAllBoards(id)
	);
	const boards: Board[] | undefined = data;
	return isLoading ? (
		<h2>Loading...</h2>
	) : boards ? (
		<>
			<h2>My boards</h2>
			{boards.map(({ title, _id }: Board) => (
				<BoardThumbnail key={_id} title={title} id={_id} />
			))}
		</>
	) : (
		<span>Oops something went wrong</span>
	);
};

export default UserPage;
