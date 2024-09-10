import { defineStore } from 'pinia';
import { apiRequest, apiAction } from '@/utils/apiUtils';

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
      this.product = {};
      this.errors = {};
    },

    setCategoryProductsPerPage(perPage) {
      this.categoryProductsPerPage = perPage;
    },

    async getProducts(page = 1) {
      const response = await apiAction(
        () => apiRequest(`/api/admin/products?page=${page}`),
        this,
        (data) => (this.products = data),
      );
      if (this.products.data.length < 1 && page > 1) {
        this.getProducts(page - 1);
      }
      return response;
    },

    async getProduct(id) {
      const response = await apiAction(
        () => apiRequest(`/api/admin/products/${id}`),
        this,
        (data) => (this.product = data),
      );
      this.product.category_id =
        this.product.category && this.product.category.id
          ? this.product.category.id
          : null;

      return response;
    },

    async getClientProudct(slug) {
      return await apiAction(
        () => apiRequest(`/api/products/${slug}`),
        this,
        (data) => (this.product = data),
      );
    },

    async getLatest() {
      return await apiAction(
        () => apiRequest('/api/products/latest'),
        this,
        (data) => (this.latest = data),
      );
    },

    async getCategoryProducts(slug, page = 1) {
      return await apiAction(
        () =>
          apiRequest(`/api/products/category-products/${slug}?page=${page}`),
        this,
        (data) => (this.categoryProducts = data),
      );
    },

    async addProduct() {
      return this.product.id
        ? await apiAction(
            () => apiRequest(`/api/admin/products/update`, 'PUT', this.product),
            this,
          )
        : await apiAction(
            () =>
              apiRequest(
                `/api/admin/products/store`,
                'POST',
                this.product,
                true,
              ),
            this,
          );
    },

    async updateThumbnailImage() {
      const { id, thumbnail } = this.product;
      return await apiAction(
        () =>
          apiRequest(
            `/api/admin/products/update/thumbnail`,
            'POST',
            { id, thumbnail },
            true,
          ),
        this,
      );
    },

    async deleteProduct(id) {
      return await apiAction(
        () => apiRequest(`/api/admin/products/${id}`, 'DELETE'),
        this,
      );
    },

    async addNewImage(data) {
      return await apiAction(
        () =>
          apiRequest('/api/admin/products/store/images', 'POST', data, true),
        this,
      );
    },

    async updateImage(data) {
      return await apiAction(
        () =>
          apiRequest('/api/admin/products/update/images', 'POST', data, true),
        this,
      );
    },

    async deleteImage(id) {
      return await apiAction(
        () => apiRequest(`/api/admin/products/images/${id}`, 'DELETE'),
        this,
      );
    },
  },
});

export default useProductStore;
