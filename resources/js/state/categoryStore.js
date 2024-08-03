import { defineStore } from 'pinia';
import axios from '@/utils/axiosUtils';

const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    categories: [],
    selectCategories: [],
    category: {
      id: null,
      name: null,
      parent_id: null,
    },
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
        if (this.category.id) {
          this.selectCategories = this.selectCategories.filter(
            (category) => category.id !== this.category.id,
          );
        }

        return response;
      } catch (error) {
        this.hasError = true;
        this.errors = error.response.data.errors;
        return;
      } finally {
        this.isLoading = false;
      }
    },

    async getCategory(id) {
      this.isLoading = true;
      this.hasError = false;
      try {
        const response = await axios.get(`/api/categories/${id}`);
        this.category = response.data;
      } catch (error) {
        this.hasError = true;
        return;
      } finally {
        this.isLoading = false;
      }
    },

    async createCategory(category) {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        let response;
        if (category.id !== null) {
          response = await axios.put('/api/categories/update', category);
        } else {
          response = await axios.post('/api/categories/store', category);
          this.categories.push(response.data);
        }

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

export default useCategoryStore;
