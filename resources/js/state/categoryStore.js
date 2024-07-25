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
    async getSelectCategories() {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        console.log('start');
        const response = await axios.get('/api/categories/select');
        console.log(response.data);
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
        window.location.reload();
      } catch (error) {
        this.hasError = true;
        this.errors = error.response.data.errors;
        return;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export default useCategoryStore;
