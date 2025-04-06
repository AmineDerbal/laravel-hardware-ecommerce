<template>
  <AdminLayoutView>
    <LoaderView v-if="isLoading" />
    <div v-else>
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">Product Details</h6>
          <div class="table-responsive">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td>Product Name</td>
                  <td>
                    <code>{{ product.name }} </code>
                  </td>
                </tr>

                <tr>
                  <td>Code</td>
                  <td>
                    <code>{{ product.code }}</code>
                  </td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>
                    <code>{{ product.price }} $</code>
                  </td>
                </tr>
                <tr>
                  <td>Stock</td>
                  <td>
                    <code>{{ product.stock }} Unit</code>
                  </td>
                </tr>

                <tr>
                  <td>Category</td>
                  <td>
                    <code>{{
                      product.category ? product.category.name : ''
                    }}</code>
                  </td>
                </tr>
                <tr>
                  <td>Thumbnail Image</td>
                  <td>
                    <img
                      :src="product.image_url"
                      class="img-fluid w-25"
                      alt="Product Image"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Product Images</td>
                  <td>
                    <div class="d-flex flex-wrap gap-2">
                      <img
                        v-for="image in product.images"
                        :src="image.image_url"
                        :key="image.id"
                        class="img-fluid w-25"
                        alt="Product Image"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>
                    <div v-html="product.description"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayoutView>
</template>

<script>
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { AdminLayoutView, LoaderView } from '@/components';
import { useProductStore } from '@/state';

export default {
  components: { AdminLayoutView, LoaderView },

  setup() {
    const store = useProductStore();
    const route = useRoute();
    const product = computed(() => store.product);
    const isLoading = computed(() => store.isLoading);
    const hasError = computed(() => store.hasError);

    const getProduct = async () => {
      const id = route.params.id;
      await store.getProduct(id);
    };

    onBeforeMount(async () => {
      await getProduct();
    });

    return {
      product,
      isLoading,
      hasError,
    };
  },
};
</script>
