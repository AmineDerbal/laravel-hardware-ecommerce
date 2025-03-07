import { defineStore } from 'pinia';
import { apiRequest, apiAction } from '@/utils/apiUtils';

const useOrderStore = defineStore({
  id: 'order',
  state: () => ({
    order: {},
    isLoading: false,
    hasError: false,
  }),

  actions: {
    async storeOrder(order) {
      return await apiAction(
        () => apiRequest('/api/orders/store', 'POST', order),
        this,
      );
    },
  },
});

export default useOrderStore;
