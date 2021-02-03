import * as React from 'react';
import { User } from 'types/dataTypes';
import AddUser from 'components/add-user-btn/AddUser.component';
import UserAvatar from 'components/user-avatar/UserAvatar.component';

import './BoardUsers.styles.css';

type Props = {
  title?: string;
  users: User[];
};

const BoardUsers = ({ title, users }: Props) => {
  return (
    <div className='board-users'>
      <h3 className='board-title'>{title}</h3>
      {users.map(({ _id, name }) => (
        <UserAvatar userId={_id} key={_id} name={name} />
      ))}
      <AddUser />
    </div>
  );
};

export default BoardUsers;
