import { defineStore } from 'pinia';
import { apiRequest, apiAction } from '@/utils/apiUtils';

const useOrderStore = defineStore({
  id: 'order',
  state: () => ({
    order: {},
    orders: null,
    isLoading: false,
    hasError: false,
  }),
  persist: {
    paths: ['orders'],
  },

  actions: {
    async getOrders(page = 1) {
      const response = await apiAction(
        () => apiRequest(`/api/admin/orders?page=${page}`),
        this,
        (data) => (this.orders = data),
      );

      if (response.data.data.length < 1 && page > 1) {
        this.getOrders(page - 1);
      }
      return response;
    },
    async getOrder(id) {
      return await apiAction(
        () => apiRequest(`/api/orders/${id}`),
        this,
        (data) => (this.order = data),
      );
    },
    async storeOrder(order) {
      return await apiAction(
        () => apiRequest('/api/orders/store', 'POST', order),
        this,
      );
    },
  },
});

export default useOrderStore;
