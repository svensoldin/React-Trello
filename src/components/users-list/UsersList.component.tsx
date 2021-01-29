import * as React from 'react';
import { User } from 'types/dataTypes';
import UserItem from 'components/user-list-item/UserItem.component';

import './UsersList.styles.css';

type Props = {
  users: User[];
};

const UsersList = ({ users }: Props) => {
  return (
    <div className='users-list'>
      {users.map((user: User) => (
        <UserItem key={user._id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
