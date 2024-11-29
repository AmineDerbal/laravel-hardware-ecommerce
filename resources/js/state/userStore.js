import { defineStore } from 'pinia';
import { apiRequest, apiAction } from '@/utils/apiUtils';
import { notifyIfNotAuthenticated } from '@/utils/authUtils';

const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      name: null,
      email: null,
      role: null,
      isAuthenticated: false,
      total_price: 0,
      cart_items: [],
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
    async calculateTotalPrice() {
      this.user.total_price =
        this.user.cart_items.reduce((acc, item) => {
          return acc + item.product.price * item.quantity;
        }, 0) || 0;
    },
    resetUserDataState() {
      this.user = {
        name: null,
        email: null,
        role: null,
        isAuthenticated: false,
        cart_items: [],
      };
    },

    notifyifNoUserAuthenticated(toast) {
      return notifyIfNotAuthenticated(this.user, toast);
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

    async fetchUserActiveCartItems(id) {
      return await apiAction(
        () => apiRequest(`/api/users/${id}/cart-items`),
        this,
        (data) => (this.user.cart_items = data),
        false,
      );
    },

    // check if it exists in cart and return id of the cart item or null
    checkIfItemIsInCart(id) {
      const item = this.user.cart_items.find((item) => item.product_id === id);
      return item ? { id: item.id, cart_id: item.cart_id } : null;
    },
  },
});

export default useUserStore;
