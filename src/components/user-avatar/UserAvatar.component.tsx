import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';

import { useProfilePicture } from 'utils/hooks';
import './UserAvatar.styles.css';

type Props = {
  userId: string;
  name: string;
  style?: React.CSSProperties;
};

// We get the user id from props (not from state) because this component does not only display the logged in user

const UserAvatar = ({ userId, name, style }: Props) => {
  const { pictureUrl } = useProfilePicture(userId);
  return (
    <Avatar src={pictureUrl} alt='user' style={style}>
      {name.split('')[0].toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
