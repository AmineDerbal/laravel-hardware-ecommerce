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
      image_url: null,
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
    clearProduct() {
      this.product = {
        id: null,
        name: null,
        description: null,
        price: null,
        stock: null,
        thumbnail: {},
        image_url: null,
        images: [],
        category_id: null,
      };
    },

    async getProducts() {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.get('/api/products');
        this.products = response.data;
        return response;
      } catch (error) {
        this.hasError = true;
        return error.response;
      } finally {
        this.isLoading = false;
      }
    },

    async getProduct(id) {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.get(`/api/products/${id}`);
        this.product = response.data;
        return response;
      } catch (error) {
        this.hasError = true;
        return error.response;
      } finally {
        this.isLoading = false;
      }
    },

    async addProduct() {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      let response;
      try {
        response = this.product.id
          ? await axios.put(`/api/products/update`, this.product)
          : await axios.post('/api/products/store', this.product, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

        return response;
      } catch (error) {
        this.hasError = true;
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
        return error.response;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteProduct(id) {
      this.isLoading = true;
      this.hasError = false;
      try {
        const response = await axios.delete(`/api/products/${id}`);
        return response;
      } catch (error) {
        this.hasError = true;
        return;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export default useProductStore;
