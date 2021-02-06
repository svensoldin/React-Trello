import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { deleteBoard } from 'api/mutations';
import { User } from 'types/dataTypes';

import Dialog from '@material-ui/core/Dialog';
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
  const [isOpen, setIsOpen] = React.useState(false);
  const handleDelete = async () => {
    await deleteBoard(boardId);
    setIsOpen(false);
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
        <button className='delete-board' onClick={() => setIsOpen(true)}>
          <DeleteIcon fontSize='small' />
          <p>Delete board</p>
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className='delete-board-dialog'>
          <div className='dialog-text'>
            <h3>Are you sure ?</h3>
            <p>This is a definitive action</p>
          </div>
          <div className='dialog-buttons'>
            <button
              className='button btn-grey'
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button className='button btn-danger' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BoardHeader;
