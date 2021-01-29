import axios from 'axios';
import * as React from 'react';
import { User } from 'types/dataTypes';
import Paper from '@material-ui/core/Paper';
import UsersList from 'components/users-list/UsersList.component';

import './SearchUser.styles.css';

async function getUsersByName(
  name: string,
  setter: React.Dispatch<React.SetStateAction<User[]>>
) {
  try {
    const res = await axios.get<User[]>(
      `${process.env.REACT_APP_SERVER_URL}/users?user=${name}`,
      { withCredentials: true }
    );
    const users = res.data;
    return setter(users);
  } catch (err) {
    console.error(err);
    return err;
  }
}

const SearchUser = () => {
  const [search, setSearch] = React.useState('');
  const [users, setUsers] = React.useState<User[]>([]);
  React.useEffect(() => {
    const timeout = setTimeout(getUsersByName, 500, search, setUsers);
    // When component re-renders (e.g. at each keystroke) the cleanup debounces the search function
    return () => clearTimeout(timeout);
  }, [search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <Paper>
      <input
        type='text'
        autoFocus={true}
        onChange={handleChange}
        className='search-user-input'
        placeholder='search users..'
      />
      {search ? <UsersList users={users} /> : null}
    </Paper>
  );
};

export default SearchUser;
