import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';

import { useProfilePicture } from '../../utils/utils';
import './UserAvatar.styles.css';

type Props = {
  userId: string;
  style?: React.CSSProperties;
};

// We get the user id from props because this component does not only display the logged in user

const UserAvatar = ({ userId, style }: Props) => {
  const { pictureUrl } = useProfilePicture(userId);
  return <Avatar src={pictureUrl} alt='user' style={style}></Avatar>;
};

export default UserAvatar;
