import React from 'react';
import axios from '@api/config';
import { useAtom } from 'jotai';

import { boardAtom } from '@jotai/atoms';
import { Board } from '@custom-types/dataTypes';

export function useProfilePicture(userId: string) {
  const [pictureUrl, setPictureUrl] = React.useState<string>();

  const getPicture = React.useCallback(async () => {
    try {
      const res = await axios.get(`/users/profile/${userId}`, {
        responseType: 'blob',
      });
      return setPictureUrl(URL.createObjectURL(res.data));
    } catch (err) {
      return setPictureUrl('');
    }
  }, [setPictureUrl, userId]);

  React.useEffect(() => {
    getPicture();
  }, [getPicture]);

  return { pictureUrl };
}

export function useBoard(boardId: string) {
  const [board, setBoard] = useAtom(boardAtom);

  const getBoardById = React.useCallback(async () => {
    try {
      const res = await axios.get<Board>(`/boards/${boardId}`);
      setBoard(res.data);
    } catch (err) {
      return err;
    }
  }, [setBoard, boardId]);

  React.useEffect(() => {
    getBoardById();
    return () => {
      setBoard(undefined);
    };
  }, [getBoardById, setBoard]);

  return { board, setBoard };
}
