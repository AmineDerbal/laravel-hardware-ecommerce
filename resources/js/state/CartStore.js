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
    async updateItemCartQuantity(product) {
      return await apiAction(
        () => apiRequest('/api/cart-items/update', 'PUT', product),
        this,
        null,
        false,
      );
    },

    async deleteCartItem(id) {
      return await apiAction(
        () => apiRequest(`/api/cart-items/${id}`, 'DELETE'),
        this,
      );
    },
  },
});

export default useCartStore;
