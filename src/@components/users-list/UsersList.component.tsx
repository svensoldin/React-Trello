import * as React from 'react';
import { User } from '@custom-types/dataTypes';

import UserItem from '@components/user-list-item/UserItem.component';
import CustomSpinner from '@components/custom-spinner/CustomSpinner.component';

import './UsersList.styles.css';

type Props = {
  users: User[];
  isLoading: boolean;
};

const UsersList = ({ users, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className='user-spinner'>
        <CustomSpinner size={30} />
      </div>
    );
  }
  return (
    <div className='users-list'>
      {users.length ? (
        users.map((user: User) => <UserItem key={user._id} user={user} />)
      ) : (
        <p className='no-users'>No users found</p>
      )}
    </div>
  );
};

export default UsersList;
