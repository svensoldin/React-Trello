import axios from '@api/config';
import { DraggableLocation } from 'react-beautiful-dnd';

export const createCardOrColumn = async (
  type: string,
  id: string,
  title: string
) => {
  switch (type) {
    case 'column':
      try {
        const res = await axios.patch(`/boards/${id}/column/add`, { title });
        return res.data;
      } catch (err) {
        return err;
      }
    case 'card':
      try {
        const res = await axios.patch(`/columns/${id}/card/add`, { title });
        return res.data;
      } catch (err) {
        return err;
      }
    default:
      return;
  }
};

export const updateCardField = async (
  text: string,
  cardId: string,
  field: string
) => {
  try {
    await axios.patch(
      `/cards/${cardId}/${field}/update`,
      { text },
      { withCredentials: true }
    );
    return;
  } catch (err) {
    return console.error(err.message);
  }
};

export const addUserToBoard = async (boardId: string, userId: string) => {
  try {
    await axios.patch(`/boards/${boardId}/user/${userId}/add`, {
      withCredentials: true,
    });
    return;
  } catch (err) {
    return console.error(err.message);
  }
};

export const reorderCards = async (
  sourceId: string,
  cardId: string,
  body: DraggableLocation
) => {
  try {
    const res = await axios.patch(`/columns/drag/${sourceId}/${cardId}`, body);
    if (res.status === 200) console.log('success');
  } catch (err) {
    console.error(err);
  }
};

export const reorderColumns = async (
  boardId: string,
  columnId: string,
  destinationIndex: number
) => {
  try {
    const res = await axios.patch(
      `/boards/${boardId}/drag/${columnId}/${destinationIndex}`
    );
    if (res.status === 200) return console.log('success');
  } catch (err) {
    console.error(err);
  }
};

export const deleteColumn = async (columnId: string) => {
  try {
    const res = await axios.delete(`/columns/${columnId}/delete`);
    if (res.status === 200) return console.log('success');
  } catch (err) {
    console.error(err);
  }
};

export const createBoard = async (name: string) => {
  try {
    const res = await axios.post<string>('/boards/', { title: name });
    if (res.status === 200) return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteBoard = async (boardId: string) => {
  try {
    const res = await axios.delete(`/boards/${boardId}`);
    if (res.status === 200) return console.log('success');
  } catch (err) {
    console.error(err);
  }
};
