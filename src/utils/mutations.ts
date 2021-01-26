import axios from 'axios';

axios.defaults.withCredentials = true;

export const createCardOrColumn = async (
  type: string,
  id: string,
  title: string
) => {
  switch (type) {
    case 'column':
      try {
        await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/boards/${id}/column/add`,
          { title },
          { withCredentials: true }
        );
        break;
      } catch (err) {
        return err;
      }
    case 'card':
      try {
        await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/columns/${id}/card/add`,
          { title },
          { withCredentials: true }
        );
        break;
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
      `${process.env.REACT_APP_SERVER_URL}/cards/${cardId}/${field}/update`,
      { text },
      { withCredentials: true }
    );
    return;
  } catch (err) {
    return console.error(err.message);
  }
};
