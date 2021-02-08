import * as React from 'react';
import { useAuthState } from '@context/index';

import ImageUpload from '@components/image-upload/ImageUpload.component';

import './Profile.styles.css';

const ProfilePage = () => {
  const {
    userDetails: { name, email },
  } = useAuthState();
  const [form, setForm] = React.useState({
    name,
    email,
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Make api call to update user info
    try {
    } catch (err) {}
  };
  return (
    <div className='profile-page'>
      <form onSubmit={handleSubmit} className='signin-form'>
        <div className='form-field'>
          <label htmlFor='name' className='label'>
            Name:
          </label>
          <input
            type='text'
            value={form.name}
            name='name'
            onChange={handleChange}
            className='input'
          />
        </div>
        <div className='form-field'>
          <label htmlFor='email' className='label'>
            Email:
          </label>
          <input
            type='text'
            value={form.email}
            name='email'
            onChange={handleChange}
            className='input'
          />
        </div>
        <button type='submit' className='button btn-blue'>
          Save changes
        </button>
      </form>
      <ImageUpload />
    </div>
  );
};

export default ProfilePage;
