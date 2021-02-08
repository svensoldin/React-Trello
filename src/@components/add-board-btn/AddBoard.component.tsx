import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { createBoard } from '@api/mutations';

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AddIcon from '@material-ui/icons/Add';

import './AddBoard.styles.css';

const AddBoard = () => {
  const [anchor, setAnchor] = React.useState();
  const [isOpen, setIsOpen] = React.useState(false);
  const [boardName, setBoardName] = React.useState('');
  let history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBoardName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!boardName) return;
    const boardId = await createBoard(boardName);
    history.push(`/boards/${boardId}`);
  };
  return (
    <>
      <div
        onClick={(e: any) => {
          setAnchor(e.target);
          setIsOpen(!isOpen);
        }}
      >
        <button className='add-board-btn'>
          <AddIcon />
        </button>
      </div>
      <Popper open={isOpen} anchorEl={anchor}>
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <Paper>
            <input
              type='text'
              value={boardName}
              onChange={handleChange}
              className='add-board-input'
              autoFocus={true}
              onKeyUp={({ key }) => {
                if (key === 'Enter') handleSubmit();
              }}
            />
            <button className='create-board-btn' onClick={handleSubmit}>
              Create
            </button>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default AddBoard;
