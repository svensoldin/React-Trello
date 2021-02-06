import * as React from 'react';
import UserPage from 'pages/user/User.page';
import LoginRegisterPage from 'pages/login-register/LoginRegister.page';
import { useAuthState } from 'context/index';
import HerokuSpinner from 'components/heroku-spinner/HerokuSpinner.component';

const UserRoute = () => {
  const {
    loading,
    userDetails: { id },
  } = useAuthState();
  if (loading) return <HerokuSpinner />;
  // If a user is authenticated, return the UserPage component, else the login page
  return id ? <UserPage id={id} /> : <LoginRegisterPage />;
};

export default UserRoute;
