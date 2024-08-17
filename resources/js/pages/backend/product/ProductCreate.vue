<template>
  <AdminLayoutView>
    <AdminProductForm
      v-model:product="product"
      :errors="errors"
      :selectCategories="selectCategories"
      :submitForm="submitForm"
    />
  </AdminLayoutView>
</template>

<script>
import { computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useProductStore, useCategoryStore } from '@/state';
import { AdminLayoutView, LoaderView, AdminProductForm } from '@/components';

export default {
  components: { AdminLayoutView, LoaderView, AdminProductForm },

  setup() {
    const store = useProductStore();
    const router = useRouter();
    const toast = useToast();
    const categoryStore = useCategoryStore();
    const product = computed(() => store.product);
    const errors = computed(() => store.errors);
    const selectCategories = computed(() => categoryStore.selectCategories);

    const submitForm = async () => {
      const response = await store.addProduct();

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message, { timeout: 2000 });
        store.clearProduct();
        router.push({ name: 'admin-product-list' });
      } else {
        toast.error('Failed to create product');
      }
    };

    onBeforeMount(async () => {
      store.clearProduct();
      await categoryStore.getSelectCategories();
    });

    return { product, errors, selectCategories, submitForm };
  },
};
</script>
