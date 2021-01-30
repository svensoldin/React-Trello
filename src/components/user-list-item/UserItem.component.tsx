import * as React from 'react';
import { User } from 'types/dataTypes';
import UserAvatar from 'components/user-avatar/UserAvatar.component';

import './UserItem.styles.css';

type Props = {
  user: User;
};

const UserItem = ({ user: { name, _id } }: Props) => {
  const handleAddUser = () => {};
  return (
    <div className='user-list-item' onClick={handleAddUser}>
      <UserAvatar userId={_id} name={name} />
      <p>{name}</p>
    </div>
  );
};

export default UserItem;
