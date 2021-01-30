import * as React from 'react';

import Popper from '@material-ui/core/Popper';
import AddIcon from '@material-ui/icons/AddOutlined';
import SearchUser from '../search-user/SearchUser.component';

import './AddUser.styles.css';

const AddUser = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState<HTMLElement | null>();
  return (
    <>
      <div
        onClick={(e: any) => {
          setAnchor(e.target);
          setIsOpen(!isOpen);
        }}
      >
        <button className='add-user-btn'>
          <AddIcon className='plus-icon' />
        </button>
      </div>
      <Popper open={isOpen} anchorEl={anchor}>
        <SearchUser closePopper={setIsOpen} />
      </Popper>
    </>
  );
};

export default AddUser;
