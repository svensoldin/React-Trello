import * as React from 'react';
import axios from '@api/config';
import { User } from '@custom-types/dataTypes';

import Paper from '@material-ui/core/Paper';
import UsersList from '@components/users-list/UsersList.component';
import { ClickAwayListener } from '@material-ui/core';

import './SearchUser.styles.css';

type Props = {
  closePopper: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchUser = ({ closePopper }: Props) => {
  const [search, setSearch] = React.useState('');
  const [users, setUsers] = React.useState<User[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const timeout = setTimeout(getUsersByName, 500, search);
    // When component re-renders (e.g. at each keystroke) the cleanup debounces the search function
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  async function getUsersByName(name: string) {
    try {
      const res = await axios.get<User[]>(`users?user=${name}`);
      const users = res.data;
      setUsers(users);
      return setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return err;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSearch(e.target.value);
  };

  return (
    <ClickAwayListener onClickAway={() => closePopper(false)}>
      <Paper>
        <input
          type='text'
          autoFocus={true}
          onChange={handleChange}
          className='search-user-input'
          placeholder='search users..'
        />
        {search ? <UsersList users={users} isLoading={isLoading} /> : null}
      </Paper>
    </ClickAwayListener>
  );
};

export default SearchUser;
