import { useAuthDispatch } from 'context';
import { registerUser } from 'context/actions';
import * as React from 'react';

const RegisterForm = () => {
  const dispatch = useAuthDispatch();
  const [credentials, setCredentials] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = credentials;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert('Passwords do not match');
    return registerUser(credentials, dispatch);
  };

  return (
    <div className='form-container'>
      <form
        data-testid='form'
        className='signin-form'
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        <h3>Register</h3>
        <div className='form-field'>
          <label htmlFor='name' className='label'>
            Name
          </label>
          <input
            aria-label='name-input'
            id='name'
            type='text'
            name='name'
            required
            value={name}
            onChange={handleChange}
            autoComplete='off'
            className='input'
            placeholder='Enter name'
          />
        </div>
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
            minLength={8}
          />
        </div>
        <div className='form-field'>
          <label htmlFor='confirmPassword' className='label'>
            Password
          </label>
          <input
            aria-label='confirmPassword-input'
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            required
            value={confirmPassword}
            onChange={handleChange}
            className='input'
            placeholder='Confirm password'
            minLength={8}
          />
        </div>
        <button className='button btn-blue' onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
