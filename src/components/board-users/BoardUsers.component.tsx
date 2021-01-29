import AddUser from 'components/add-user-btn/AddUser.component';
import UserAvatar from 'components/user-avatar/UserAvatar.component';
import * as React from 'react';

type Props = {
  title: string;
  users: string[];
};

const BoardUsers = ({ title, users }: Props) => {
  return (
    <div className='board-users'>
      <h3 className='board-title'>{title}</h3>
      {users.map((user) => (
        <UserAvatar userId={user} key={user} />
      ))}
      <AddUser />
    </div>
  );
};

export default BoardUsers;
