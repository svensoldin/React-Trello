import * as React from 'react';
import axios from '@api/config';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import './styles.css';

type Props = {
  title: string;
  columnId: string;
};

const EditableTitle = ({ title, columnId }: Props) => {
  const [isInputOpen, setIsInputOpen] = React.useState(false);
  const [stateTitle, setStateTitle] = React.useState(title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setStateTitle(e.target.value);
  };

  const handleClickAway = async () => {
    setIsInputOpen(false);
    // If the title was changed
    if (stateTitle !== title) {
      try {
        const url = `${process.env.REACT_APP_SERVER_URL}/columns/${columnId}/title`;
        await axios.patch(
          url,
          { title: stateTitle },
          { withCredentials: true }
        );
      } catch (err) {
        console.error(err);
        setStateTitle(title);
      }
    }
  };

  return isInputOpen ? (
    <ClickAwayListener onClickAway={handleClickAway}>
      <input
        type='text'
        value={stateTitle}
        onChange={handleChange}
        className='column-title'
        autoFocus={true}
        onKeyUp={({ key }) => {
          if (key === 'Enter') handleClickAway();
        }}
      />
    </ClickAwayListener>
  ) : (
    <h2 onClick={() => setIsInputOpen(true)} className='column-title'>
      {stateTitle}
    </h2>
  );
};

export default EditableTitle;
