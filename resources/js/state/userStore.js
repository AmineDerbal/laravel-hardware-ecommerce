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
    users: {},
    errors: {},
    isLoading: false,
    hasError: false,
  }),
  persist: {
    paths: ['user', 'users'],
  },
  actions: {
    async registerUser({ email, name, password, password_confirmation }) {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.post('/api/auth/register', {
          email,
          name,
          password,
          password_confirmation,
        });

        return response;
      } catch (error) {
        this.hasError = true;
        this.errors = error.response.data.errors;

        return;
      } finally {
        this.isLoading = false;
      }
    },
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
        return error.response;
      }
    },

    async getUsers() {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.get('/api/admin/users');
        this.users = response.data;
        return response;
      } catch (error) {
        this.hasError = true;
        return error.response;
      } finally {
        this.isLoading = false;
      }
    },

    async toggleUserAciveStatus(id) {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.patch(
          `/api/admin/users/${id}/toggle-active-status`,
        );
        return response;
      } catch (error) {
        this.hasError = true;
        return error.response;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export default useUserStore;
