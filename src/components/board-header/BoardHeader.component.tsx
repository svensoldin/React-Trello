import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { deleteBoard } from 'api/mutations';
import { User } from 'types/dataTypes';

import AddUser from 'components/add-user-btn/AddUser.component';
import UserAvatar from 'components/user-avatar/UserAvatar.component';
import DeleteIcon from '@material-ui/icons/Delete';

import './BoardHeader.styles.css';

type Props = {
  title?: string;
  users: User[];
  boardId: string;
};

const BoardHeader = ({ title, users, boardId }: Props) => {
  let history = useHistory();
  const handleDelete = async () => {
    await deleteBoard(boardId);
    history.push('/');
  };
  return (
    <div className='board-header'>
      <div className='board-users'>
        <h3 className='board-title'>{title}</h3>
        {users.map(({ _id, name }) => (
          <UserAvatar userId={_id} key={_id} name={name} />
        ))}
        <AddUser />
      </div>
      <div className='board-options'>
        <button className='delete-board' onClick={handleDelete}>
          <DeleteIcon fontSize='small' />
          <p>Delete board</p>
        </button>
      </div>
    </div>
  );
};

export default BoardHeader;
