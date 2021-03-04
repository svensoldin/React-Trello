import React from 'react';
import axios from '@api/config';
import { Dispatch } from './reducer';

type Credentials = {
  email: string;
  password: string;
};

export const loginUser = async (
  dispatch: Dispatch,
  credentials: Credentials
) => {
  dispatch({ type: 'Login start' });
  try {
    const res = await axios.post(`users/signin`, credentials);
    if (res.status === 200) {
      dispatch({
        type: 'Login success',
        payload: res.data.user,
      });
      return res.data.user;
    }
  } catch (err) {
    if (err.response)
      return dispatch({
        type: 'Wrong credentials',
        payload: 'Wrong credentials',
      });
    dispatch({ type: 'Login fail', payload: 'Oops, something went wrong' });
  }
};

export const logout = async (dispatch: Dispatch) => {
  try {
    const res = await axios.post(`/users/logout`, {});
    if (res.status === 200) {
      dispatch({ type: 'Logout' });
    }
  } catch (err) {
    return err;
  }
};

export const registerUser = async (
  credentials: { name: string; email: string; password: string },
  dispatch: Dispatch
) => {
  try {
    const res = await axios.post('/users/register', credentials);
    if (res.status === 200) {
      dispatch({ type: 'Login success', payload: res.data.user });
      return res.data.user;
    }
    if (res.data.errors)
      dispatch({ type: 'Login fail', payload: res.data.errors });
  } catch (err) {
    console.error(err);
    dispatch({ type: 'Login fail', payload: err });
  }
};

export const useSession = (dispatch: Dispatch) => {
  const [isLoading, setIsLoading] = React.useState(true);

  // Prevent infinite rerendering cycle with useCallback (checkUserSession is a dependency of useEffect)
  const checkUserSession = React.useCallback(async () => {
    try {
      const res = await axios.get(`/users/session`);
      if (res.data) {
        dispatch({ type: 'Login success', payload: res.data });
        return setIsLoading(false);
      }
    } catch (err) {
      dispatch({ type: 'Login fail', payload: err });
      return setIsLoading(false);
    }
    setIsLoading(false);
  }, [dispatch]);

  React.useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return { isLoading };
};
