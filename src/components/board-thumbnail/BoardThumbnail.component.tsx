import * as React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'types/dataTypes';

import UserAvatar from 'components/user-avatar/UserAvatar.component';

import './BoardThumbnail.styles.css';

type Props = {
  title: string;
  id: string;
  users: User[];
};

// TODO: fetch board picture

const BoardThumbnail = ({ title, id, users }: Props) => {
  return (
    <Link to={`/boards/${id}`} className='board-thumbnail'>
      <img
        alt='board'
        width='250'
        height='150'
        src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80'
      />
      <p>{title}</p>
      <div className='board-thumbnail-users'>
        {users.map(({ name, _id }) => (
          <UserAvatar key={_id} userId={_id} name={name} />
        ))}
      </div>
    </Link>
  );
};

export default BoardThumbnail;
