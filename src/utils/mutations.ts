import axios from "axios";

axios.defaults.withCredentials = true;

export const createCard = async (columnId: string, title: string) => {
	try {
		await axios.patch(
			`${process.env.REACT_APP_SERVER_URL}/columns/${columnId}/card/add`,
			{ title },
			{ withCredentials: true }
		);
	} catch (err) {
		return err;
	}
};

export const createColumn = async (boardId: string, title: string) => {
	const url = `${process.env.REACT_APP_SERVER_URL}/boards/${boardId}/column/add`;
	try {
		await axios.patch(url, { title }, { withCredentials: true });
		return;
	} catch (err) {
		return err;
	}
};
