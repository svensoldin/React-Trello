import axios from 'axios';
import { Board } from '@custom-types/dataTypes';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export async function getAllBoards(id: string) {
  try {
    const res = await axios.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function getBoardById(boardId: string) {
  const url = `/boards/${boardId}`;
  try {
    const res = await axios.get<Board>(url);
    const board = res.data;
    return board;
  } catch (err) {
    return err;
  }
}

export async function getCardsFromColumn(columnId: string) {
  try {
    const res = await axios.get(`/cards/${columnId}`);
    const cards = res.data;
    return cards;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function getPictureById(userId: string) {
  const url = `/users/profile/${userId}`;
  try {
    const res = await axios.get(url, { responseType: 'blob' });
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}
