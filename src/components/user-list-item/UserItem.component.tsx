import * as React from 'react';
import { User } from 'types/dataTypes';
import UserAvatar from 'components/user-avatar/UserAvatar.component';

import './UserItem.styles.css';

type Props = {
  user: User;
};

const UserItem = ({ user }: Props) => {
  return (
    <div className='user-list-item'>
      <UserAvatar userId={user._id} />
      <p>{user.name}</p>
    </div>
  );
};

export default UserItem;
