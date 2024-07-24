import { defineStore } from 'pinia';
import axios from 'axios';
import { configureAxios } from '../utils/axiosUtils';

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
        configureAxios();
        const response = await axios.post('/api/auth/login', {
          email,
          password,
        });

        this.user.name = response.data.user.name;
        this.user.email = response.data.user.email;
        this.user.role = response.data.user.role;
        this.user.isAuthenticated = true;
        return response.data;
      } catch (error) {
        this.hasError = true;
        this.errors = error.response.data.errors;
        return;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export default useUserStore;
