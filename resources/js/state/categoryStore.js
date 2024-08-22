import { defineStore } from 'pinia';
import axios from '@/utils/axiosUtils';

const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    categories: {},
    selectCategories: [],
    headerCategories: [],
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
    paths: ['categories', 'selectCategories', 'headerCategories'],
  },

  actions: {
    clearCategory() {
      this.category = {};
      this.errors = {};
    },
    async getCategories(page = 1) {
      this.isLoading = true;
      this.hasError = false;
      try {
        const response = await axios.get(`/api/categories?page=${page}`);
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

    async getHeaderCategories() {
      this.hasError = false;
      try {
        const response = await axios.get('/api/categories/header');
        this.headerCategories = response.data;
        return response;
      } catch (error) {
        this.hasError = true;
        return;
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
          return response;
        }

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

    async deleteCategory(id) {
      this.isLoading = true;
      this.hasError = false;
      try {
        const response = await axios.delete(`/api/categories/${id}`);
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

export default useCategoryStore;
