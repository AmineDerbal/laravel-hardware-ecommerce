import axios from 'axios';

const configureAxios = () => {
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;
};

export { configureAxios };
