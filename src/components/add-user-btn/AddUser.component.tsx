import * as React from 'react';

import Popper from '@material-ui/core/Popper';
import AddIcon from '@material-ui/icons/AddOutlined';
import SearchUser from '../search-user/SearchUser.component';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const AddUser = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState<HTMLElement | null>();
  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div>
        <button className='add-user-btn'>
          <AddIcon
            className='plus-icon'
            onClick={(e: any) => {
              setAnchor(e.target);
              setIsOpen(true);
            }}
          />
        </button>
        <Popper open={isOpen} anchorEl={anchor}>
          <SearchUser />
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default AddUser;
