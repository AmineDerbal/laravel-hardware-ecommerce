import { defineStore } from 'pinia';
import axios from '../utils/axiosUtils';

const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      name: null,
      email: null,
      role: null,
      isAuthenticated: false,
    },
    errors: {},
    isLoading: false,
    hasError: false,
  }),
  persist: {
    paths: ['user'],
  },
  actions: {
    async loginUser({ email, password }) {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.post('/api/auth/login', {
          email,
          password,
        });
        const { user } = response.data;

        this.user = {
          ...this.user,
          ...user,
          isAuthenticated: true,
        };
        return response.data;
      } catch (error) {
        this.hasError = true;
        this.errors = error.response.data.errors;
        return;
      } finally {
        this.isLoading = false;
      }
    },
    async logoutUser() {
      try {
        const response = await axios.post('/api/auth/logout');
        this.user = {
          name: null,
          email: null,
          role: null,
          isAuthenticated: false,
        };
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default useUserStore;
