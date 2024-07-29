import { defineStore } from 'pinia';
import axios from '@/utils/axiosUtils';

const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    categories: [],
    selectCategories: [],
    errors: {},
    isLoading: false,
    hasError: false,
  }),
  persist: {
    paths: ['categories', 'selectCategories'],
  },

  actions: {
    async getCategories() {
      this.isLoading = true;
      this.hasError = false;
      try {
        const response = await axios.get('/api/categories');
        this.categories = response.data;
        return response;
      } catch (error) {
        this.hasError = true;
        return response;
      } finally {
        this.isLoading = false;
      }
    },
    async getSelectCategories() {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.get('/api/categories/select');

        this.selectCategories = response.data;
      } catch (error) {
        this.hasError = true;
        this.errors = error.response.data.errors;
        return;
      } finally {
        this.isLoading = false;
      }
    },

    async createCategory({ name, parent_id }) {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.post('/api/categories/store', {
          name,
          parent_id,
        });
        this.categories.push(response.data);
        return response;
      } catch (error) {
        this.hasError = true;
        console.log('error', error);
        this.errors = error.response.data.errors;
        return error.response;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export default useCategoryStore;
