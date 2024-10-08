import axios from 'axios';

import { useUserStore } from '@/state';

const configureAxios = () => {
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          const toastMessage = error.response.data.message;
          const userStore = useUserStore();
          await userStore.logoutUser();

          window.location.href = `/login?message=${encodeURIComponent(
            toastMessage,
          )}&type=error`;

          return;
        }
        if (statusCode === 404) {
          window.location.href = '/404';
          return;
        }
      }

      return Promise.reject(error);
    },
  );
  return axios;
};

const configuredAxios = configureAxios();

export default configuredAxios;
