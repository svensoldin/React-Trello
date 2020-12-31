import axios from "axios";

axios.defaults.withCredentials = true;

export async function getAllBoards(id: string) {
	try {
		const res = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/users/${id}`,
			{
				withCredentials: true,
			}
		);
		return res.data;
	} catch (err) {
		return err;
	}
}

export async function getBoardById(boardId: string) {
	const url = `${process.env.REACT_APP_SERVER_URL}/boards/${boardId}`;
	try {
		const res = await axios.get(url, { withCredentials: true });
		return res.data;
	} catch (err) {
		return err;
	}
}

export async function getCardsFromColumn(columnId: string) {
	try {
		const res = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/cards/${columnId}`,
			{ withCredentials: true }
		);
		const cards = res.data;
		return cards;
	} catch (err) {
		console.error(err);
		return err;
	}
}

export async function getPicture() {
	const url = `${process.env.REACT_APP_SERVER_URL}/users/profile`;
	try {
		const res = await axios.post(
			url,
			{},
			{
				responseType: "blob",
				withCredentials: true,
			}
		);
		const blob = res.data;
		const pictureURL = URL.createObjectURL(blob);
		return pictureURL;
	} catch (err) {
		console.error(err);
		return err;
	}
}
