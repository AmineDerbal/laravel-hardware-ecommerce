import { defineStore } from 'pinia';
import axios from '@/utils/axiosUtils';

const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    products: [],
    latest: [],
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
    paths: ['products', 'latest'],
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

    async getProducts(page = 1) {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.get(`/api/products?page=${page}`);
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
        this.product.category_id = this.product.category.id;
        return response;
      } catch (error) {
        this.hasError = true;
        return error.response;
      } finally {
        this.isLoading = false;
      }
    },

    async getLatest() {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.get('/api/products/latest');
        this.latest = response.data;
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

    async updateThumbnailImage() {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const { id, thumbnail } = this.product;
        const response = await axios.post(
          `/api/products/update/thumbnail`,
          { id, thumbnail },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
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

    async addNewImage(data) {
      this.isLoading = true;
      this.hasError = false;

      try {
        const response = await axios.post(`/api/products/store/images`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response;
      } catch (error) {
        this.hasError = true;
        return error.response;
      } finally {
        this.isLoading = false;
      }
    },

    async updateImage(data) {
      this.isLoading = true;
      this.hasError = false;
      try {
        const response = await axios.post(`/api/products/update/images`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response;
      } catch (error) {
        this.hasError = true;
        return error.response;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteImage(id) {
      this.isLoading = true;
      this.hasError = false;
      try {
        const response = await axios.delete(`/api/products/images/${id}`);
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
