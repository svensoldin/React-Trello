import React from 'react';
import { useQuery } from 'react-query';
import { Board } from 'types/dataTypes';
import { getAllBoards } from 'api/queries';

import BoardThumbnail from 'components/board-thumbnail/BoardThumbnail.component';
import AddBoard from 'components/add-board-btn/AddBoard.component';

import './User.styles.css';

type Props = {
  id: string;
};

type QueryReturn = {
  data: Board[] | undefined;
  isLoading: boolean;
};

const UserPage = ({ id }: Props) => {
  const { data }: QueryReturn = useQuery(['getAllBoards', id], () =>
    getAllBoards(id)
  );
  return (
    <div className='user-page'>
      <header className='user-page-header'>
        <h2>My boards</h2>
        <AddBoard />
      </header>
      <div className='boards-list'>
        {data?.map(({ title, _id, users }: Board) => (
          <BoardThumbnail key={_id} title={title} id={_id} users={users} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;
