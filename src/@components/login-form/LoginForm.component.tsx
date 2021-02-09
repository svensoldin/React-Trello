import * as React from 'react';
import { useAtom } from 'jotai';
import { toastAtom } from '@jotai/atoms';
import { loginUser, useAuthDispatch, useAuthState } from '@context/index';

import './LoginForm.styles.css';

// Refactor idea: separating the logic (API call) in a container and the actual form in a component

const LoginForm = () => {
  const [, setToast] = useAtom(toastAtom);
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
  });
  const { email, password } = credentials;
  const { error } = useAuthState();
  React.useEffect(() => {
    if (error) {
      setToast({
        isOpen: true,
        message: error,
        severity: 'error',
      });
    }
  }, [error, setToast]);

  // Put the form input in the state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Get dispatch from context
  const dispatch = useAuthDispatch();

  // Trigger login API call with the credentials stored in the state
  const handleSubmit = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    loginUser(dispatch, credentials);
  };

  return (
    <div className='form-container'>
      <form
        data-testid='form'
        className='signin-form'
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <h3>Sign in</h3>
        <div className='form-field'>
          <label htmlFor='email' className='label'>
            Email
          </label>
          <input
            aria-label='email-input'
            id='email'
            type='email'
            name='email'
            required
            value={email}
            onChange={handleChange}
            autoComplete='off'
            className='input'
            placeholder='Enter email'
          />
        </div>
        <div className='form-field'>
          <label htmlFor='password' className='label'>
            Password
          </label>
          <input
            aria-label='password-input'
            id='password'
            type='password'
            name='password'
            required
            value={password}
            onChange={handleChange}
            className='input'
            placeholder='Enter password'
          />
        </div>
        <button className='button btn-blue' onClick={handleSubmit}>
          Sign In
        </button>
        <p>For testing, you can use: john@gmail.com / 12345678</p>
      </form>
    </div>
  );
};

export default LoginForm;
