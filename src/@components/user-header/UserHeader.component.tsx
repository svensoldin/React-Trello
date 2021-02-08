import * as React from 'react';
import { useHistory } from 'react-router-dom';

// Custom hooks
import { useAuthState, useAuthDispatch, logout } from '@context/index';
import { useProfilePicture } from '@utils/hooks';

// Components
import UserDropdown from '@components/user-dropdown/UserDropdown.component';
import Avatar from '@material-ui/core/Avatar';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import './UserHeader.styles.css';

type Props = {
  name: string;
};

const UserHeader = ({ name }: Props) => {
  // Showing/hiding the popper when the user clicks on the header
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [
    anchorElement,
    setAnchorElement,
  ] = React.useState<HTMLElement | null>();
  const history = useHistory();

  // Fetching the user's profile picture to put it in the avatar
  const {
    userDetails: { id },
  } = useAuthState();
  const { pictureUrl } = useProfilePicture(id);

  // Logout logic
  const dispatch = useAuthDispatch();
  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // Call the logout function with dispatch as an arg
    await logout(dispatch);
    history.push('/');
  };
  return (
    <ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
      <div className='user-header'>
        <Avatar
          src={pictureUrl}
          className='avatar'
          alt={name}
          aria-haspopup='true'
          onClick={(e: any) => {
            setAnchorElement(e.target);
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {name.split('')[0].toUpperCase()}
        </Avatar>

        <Popper
          open={isMenuOpen}
          anchorEl={anchorElement}
          data-testid='dropdown'
        >
          <UserDropdown
            handleLogout={handleLogout}
            avatarURL={pictureUrl}
            setIsOpen={setIsMenuOpen}
          />
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default UserHeader;
