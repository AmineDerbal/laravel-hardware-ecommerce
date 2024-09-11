import { defineStore } from 'pinia';
import { apiRequest, apiAction } from '@/utils/apiUtils';

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
    resetUserDataState() {
      this.user = {
        name: null,
        email: null,
        role: null,
        isAuthenticated: false,
      };
    },
    async registerUser(data) {
      return await apiAction(
        () => apiRequest('/api/auth/register', 'POST', data),
        this,
      );
    },

    async loginUser(data) {
      return await apiAction(
        () => apiRequest('/api/auth/login', 'POST', data),
        this,
        (data) =>
          (this.user = { ...this.user, ...data.user, isAuthenticated: true }),
      );
    },

    async logoutUser() {
      const response = await apiAction(
        () => apiRequest('/api/auth/logout', 'POST'),
        this,
      );
      if (response.status === 200) {
        this.resetUserDataState();
      }
      return response;
    },

    async getUsers() {
      return await apiAction(
        () => apiRequest('/api/admin/users'),
        this,
        (data) => (this.users = data),
      );
    },

    async toggleUserAciveStatus(id) {
      return await apiAction(
        () =>
          apiRequest(`/api/admin/users/${id}/toggle-active-status`, 'PATCH'),
        this,
        null,
        false,
      );
    },
  },
});

export default useUserStore;
