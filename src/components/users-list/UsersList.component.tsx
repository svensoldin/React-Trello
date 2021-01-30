import * as React from 'react';
import { User } from 'types/dataTypes';
import UserItem from 'components/user-list-item/UserItem.component';

import './UsersList.styles.css';
import { CircularProgress, makeStyles } from '@material-ui/core';

type Props = {
  users: User[];
  isLoading: boolean;
};

const useStyles = makeStyles({
  root: {
    color: '#2f80ed',
  },
});

const UsersList = ({ users, isLoading }: Props) => {
  const classes = useStyles();
  if (isLoading) {
    return (
      <div className='user-spinner'>
        <CircularProgress size={30} className={classes.root} />
      </div>
    );
  }
  return (
    <div className='users-list'>
      {users.length ? (
        users.map((user: User) => <UserItem key={user._id} user={user} />)
      ) : (
        <p className='no-users'>No users found</p>
      )}
    </div>
  );
};

export default UsersList;
