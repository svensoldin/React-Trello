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
        src='https://static.passeportsante.net/680x357/i93408-.jpeg'
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
