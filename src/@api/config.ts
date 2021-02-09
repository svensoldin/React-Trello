import axios from 'axios';

export default axios.create({
  baseURL:
    process.env['NODE.ENV'] === 'production'
      ? process.env.REACT_APP_BASE_URL_PROD
      : process.env.REACT_APP_BASE_URL_DEV,
  withCredentials: true,
});
