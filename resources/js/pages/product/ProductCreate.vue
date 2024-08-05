<template>
  <LayoutView>
    <ProductForm
      v-model:product="product"
      :errors="errors"
      :selectCategories="selectCategories"
    />
  </LayoutView>
</template>

<script>
import { computed, onBeforeMount } from 'vue';
import { useProductStore, useCategoryStore } from '@/state';
import { LayoutView, LoaderView, ProductForm } from '@/components';

export default {
  components: { LayoutView, LoaderView, ProductForm },

  setup() {
    const store = useProductStore();
    const categoryStore = useCategoryStore();
    const product = computed(() => store.product);
    const errors = computed(() => store.errors);
    const selectCategories = computed(() => categoryStore.selectCategories);

    onBeforeMount(async () => {
      await categoryStore.getSelectCategories();
    });

    return { product, errors, selectCategories };
  },
};
</script>
