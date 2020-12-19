import * as React from "react";
import { Link } from "react-router-dom";

import "./BoardThumbnail.styles.css";

type Props = {
	title: string;
	id: string;
};

// TODO: fetch board picture

const BoardThumbnail = ({ title, id }: Props) => {
	return (
		<Link to={`/boards/${id}`} className="board-link">
			<div className="board-thumbnail">
				<img
					alt="board"
					width="250"
					height="150"
					src="https://static.passeportsante.net/680x357/i93408-.jpeg"
				/>
				<p>{title}</p>
			</div>
		</Link>
	);
};

export default BoardThumbnail;
