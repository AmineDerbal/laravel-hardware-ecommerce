import { defineStore } from 'pinia';
import { apiRequest, apiAction } from '@/utils/apiUtils';

const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    categories: null,
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
    resetState() {
      this.isLoading = false;
      this.hasError = false;
      this.errors = {};
    },

    clearCategory() {
      this.category = {
        id: null,
        name: null,
        parent_id: null,
      };
      this.resetState();
    },

    async getCategories(page = 1) {
      const response = await apiAction(
        () => apiRequest(`/api/categories?page=${page}`),
        this,
        (data) => (this.categories = data),
      );

      if (response.data.data.length < 1 && page > 1) {
        this.getCategories(page - 1);
      }
      return response;
    },

    async getSelectCategories() {
      const response = await apiAction(
        () => apiRequest('/api/categories/select'),
        this,
        (data) => (this.selectCategories = data),
      );
      if (this.category.id) {
        this.selectCategories = this.selectCategories.filter(
          (category) => category.id !== this.category.id,
        );
      }

      return response;
    },

    async getCategory(id) {
      return await apiAction(
        () => apiRequest(`/api/categories/${id}`),
        this,
        (data) => (this.category = data),
      );
    },

    async getHeaderCategories() {
      return await apiAction(
        () => apiRequest('/api/categories/header'),
        this,
        (data) => (this.headerCategories = data),
      );
    },

    async createCategory(category) {
      return category.id === null
        ? await apiAction(
            () => apiRequest('/api/categories/store', 'POST', category),
            this,
          )
        : await apiAction(
            () => apiRequest('/api/categories/update', 'PUT', category),
            this,
          );
    },

    async deleteCategory(id) {
      return await apiAction(
        () => apiRequest(`/api/categories/${id}`, 'DELETE'),
        this,
      );
    },
  },
});

export default useCategoryStore;
