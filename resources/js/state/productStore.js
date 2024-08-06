import { defineStore } from 'pinia';
import axios from '@/utils/axiosUtils';

const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    products: [],
    product: {
      id: null,
      name: null,
      description: null,
      price: null,
      stock: null,
      thumbnail: {},
      images: [],
      category_id: null,
    },
    errors: {},
    isLoading: false,
    hasError: false,
  }),
  persist: {
    paths: ['products'],
  },

  actions: {
    async addProduct() {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.post('/api/products/store', this.product, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response;
      } catch (error) {
        this.hasError = true;
        this.errors = error.response.data.errors;
        return error.response;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export default useProductStore;
