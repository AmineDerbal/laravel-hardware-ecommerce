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
      thumbnail: null,
      category_id: null,
    },
    errors: {},
    isLoading: false,
    hasError: false,
  }),
  persist: {
    paths: ['products'],
  },
});

export default useProductStore;
