import { defineStore } from 'pinia';
import { apiRequest, apiAction } from '@/utils/apiUtils';

const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    cart: [],
    isLoading: false,
    hasError: false,
  }),
  actions: {
    async addItemToCart(product) {
      return product.id && product.cart_id
        ? await apiAction(
            () =>
              apiRequest('/api/cart-items/increment-quantity', 'PUT', product),
            this,
            null,
            false,
          )
        : await apiAction(
            () => apiRequest('/api/cart-items/store', 'POST', product),
            this,
            null,
            false,
          );
    },
  },
});

export default useCartStore;
