<template>
  <LayoutView>
    <h1 v-if="hasError">An Error has occurred</h1>
    <div v-else>
      <LoaderView v-if="isLoading" />
      <ProductForm
        v-model:product="product"
        :errors="errors"
        :submitForm="submitForm"
        :selectCategories="selectCategories"
        :isEditing="true"
        :key="product"
        v-else
      />
    </div>
  </LayoutView>
</template>

<script>
import { onBeforeMount, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { LayoutView, LoaderView, ProductForm } from '@/components';
import { useProductStore, useCategoryStore } from '@/state';

export default {
  components: {
    LayoutView,
    LoaderView,
    ProductForm,
  },

  setup() {
    const store = useProductStore();
    const categoryStore = useCategoryStore();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const product = computed(() => store.product);
    const isLoading = ref(false);
    const hasError = computed(() => store.hasError);
    const errors = computed(() => store.errors);
    const selectCategories = computed(() => categoryStore.selectCategories);

    const submitForm = async () => {
      const response = await store.addProduct();

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message, { timeout: 2000 });
        store.clearProduct();
        router.push({ name: 'product-list' });
      } else {
        toast.error('Failed to create product');
      }
    };

    onBeforeMount(async () => {
      isLoading.value = true;
      await store.getProduct(route.params.id);
      await categoryStore.getSelectCategories();
      isLoading.value = false;
    });

    return {
      product,
      isLoading,
      hasError,
      errors,
      selectCategories,
      submitForm,
    };
  },
};
</script>
