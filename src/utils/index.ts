import React from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export function useProfilePicture(userId: string) {
  const url = `${process.env.REACT_APP_SERVER_URL}/users/profile/${userId}`;
  const [pictureUrl, setPictureUrl] = React.useState<string>();
  React.useEffect(() => {
    const getPicture = async () => {
      try {
        const res = await axios.post(
          url,
          {},
          { withCredentials: true, responseType: 'blob' }
        );
        return setPictureUrl(URL.createObjectURL(res.data));
      } catch (err) {
        return console.error(err);
      }
    };
    getPicture();
  }, [url]);
  return { pictureUrl };
}
