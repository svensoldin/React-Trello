import * as React from 'react';

import SearchIcon from '@material-ui/icons/Search';

import './Searchbar.styles.css';

const Searchbar = () => {
  return (
    <div className='searchbar'>
      <input type='text' placeholder='search...' className='search-input' />
      <button className='search-btn'>
        <SearchIcon fontSize='small' />
      </button>
    </div>
  );
};

export default Searchbar;
