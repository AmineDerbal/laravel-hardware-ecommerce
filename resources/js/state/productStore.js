import { defineStore } from 'pinia';
import axios from '@/utils/axiosUtils';

const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    products: null,
    latest: [],
    product: {},
    categoryProducts: {},
    categoryProductsPerPage: 9,
    errors: {},
    isLoading: false,
    hasError: false,
  }),
  persist: {
    paths: ['products', 'latest', 'categoryProductsPerPage'],
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
      this.errors = {};
    },

    setCategoryProductsPerPage(perPage) {
      this.categoryProductsPerPage = perPage;
    },

    async getProducts(page = 1) {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.get(`/api/admin/products?page=${page}`);
        this.products = response.data;
        console.log(response.data);
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
        const response = await axios.get(`/api/admin/products/${id}`);
        this.product = response.data;
        this.product.category_id =
          this.product.category && this.product.category.id
            ? this.product.category.id
            : null;
        return response;
      } catch (error) {
        this.hasError = true;
        return error.response;
      } finally {
        this.isLoading = false;
      }
    },

    async getClientProudct(slug) {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.get(`/api/products/${slug}`);
        this.product = response.data;
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

    async getCategoryProducts(slug, page = 1) {
      this.isLoading = true;
      this.hasError = false;
      this.errors = {};
      try {
        const response = await axios.get(
          `/api/products/category-products/${slug}?page=${page}`,
        );
        this.categoryProducts = response.data;
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
          ? await axios.put(`/api/admin/products/update`, this.product)
          : await axios.post('/api/admin/products/store', this.product, {
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
          `/api/admin/products/update/thumbnail`,
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
        const response = await axios.delete(`/api/admin/products/${id}`);
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
        const response = await axios.post(
          `/api/admin/products/store/images`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
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
        const response = await axios.post(
          `/api/admin/products/update/images`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
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
        const response = await axios.delete(`/api/admin/products/images/${id}`);
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
