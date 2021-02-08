import * as React from 'react';
import axios from 'axios';

import './ImageUpload.styles.css';

const ImageUpload = () => {
  const [picture, setPicture] = React.useState<undefined | File>();

  const onDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPicture(e.target.files[0]);
  };

  const handleUpload = async (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    const data = new FormData();
    if (!picture) return alert('Please select a picture');
    data.append('attachment', picture);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/profile/add`,
        data,
        { withCredentials: true }
      );
      setPicture(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='image-upload'>
      <p>Change profile picture</p>
      <form className='picture-form' onSubmit={handleUpload}>
        <label htmlFor='img' className='picture-input-label'>
          {' '}
          <img
            src={
              picture
                ? URL.createObjectURL(picture)
                : 'https://www.doctorlasercursos.com.br/uploads/avatars/2016/06/empty-avatar.jpg'
            }
            alt='uploaded'
            height={80}
            width={80}
          />
        </label>
        <input
          type='file'
          onChange={onDrop}
          id='img'
          className='picture-input'
        />
        <button onClick={handleUpload} className='upload-button'>
          Upload
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
