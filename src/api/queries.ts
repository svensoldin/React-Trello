import axios from 'axios';
import { Board } from '../types/dataTypes';

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
    const res = await axios.get<Board>(url, { withCredentials: true });
    const board = res.data;
    return board;
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

export async function getPictureById(userId: string) {
  const url = `${process.env.REACT_APP_SERVER_URL}/users/profile/${userId}`;
  try {
    const res = await axios.get(url, { responseType: 'blob' });
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}
