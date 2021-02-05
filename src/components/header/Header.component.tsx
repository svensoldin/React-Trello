import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'context/index';

//Components
import UserHeader from 'components/user-header/UserHeader.component';
import Searchbar from 'components/searchbar/Searchbar.component';
import AppBar from '@material-ui/core/AppBar';
import { ReactComponent as TrelloLogo } from 'assets/trello.svg';

import './Header.styles.css';

const appBarStyles = {
  background: '#F8F8F8',
  minHeight: 60,
  maxHeight: 60,
};

const Header = () => {
  const user = useAuthState();
  const {
    userDetails: { id, name },
  } = user;
  return (
    <AppBar position='static' style={appBarStyles}>
      <header className='header'>
        <Link to='/' className='title-container'>
          <TrelloLogo style={{ width: 30 }} />
          <h3 className='main-title'>React-Trello</h3>
        </Link>
        {id ? (
          <nav className='nav'>
            <Searchbar />
            <UserHeader name={name} />
          </nav>
        ) : null}
      </header>
    </AppBar>
  );
};

export default Header;
