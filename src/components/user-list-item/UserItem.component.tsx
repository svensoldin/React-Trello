import * as React from 'react';
import { Board, User } from 'types/dataTypes';
import UserAvatar from 'components/user-avatar/UserAvatar.component';

import './UserItem.styles.css';
import { useAtom } from 'jotai';
import { boardAtom, toastAtom } from 'jotai/atoms';
import { addUserToBoard } from 'api/mutations';

type Props = {
  user: User;
};

const UserItem = ({ user }: Props) => {
  const [, setToast] = useAtom(toastAtom);
  const [board, setBoard] = useAtom(boardAtom);

  const handleAddUser = () => {
    if (board?.users.find((item) => item._id === user._id))
      return setToast({
        isOpen: true,
        message: `${user.name} is already a part of the board`,
        severity: 'info',
      });
    setToast({ isOpen: true, message: 'User added', severity: 'success' });
    const newBoard = { ...board } as Board;
    newBoard.users.push(user);
    setBoard(newBoard);
    addUserToBoard((board as Board)._id, _id);
  };
  const { _id, name } = user;
  return (
    <div className='user-list-item' onClick={handleAddUser}>
      <UserAvatar userId={_id} name={name} />
      <p>{name}</p>
    </div>
  );
};

export default UserItem;
