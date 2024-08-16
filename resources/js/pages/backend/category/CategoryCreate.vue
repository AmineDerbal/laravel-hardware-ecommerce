<template>
  <LayoutView>
    <LoaderView v-if="isLoading" />
    <CategoryForm
      v-model:category="category"
      :errors="errors"
      :submitForm="submitForm"
      :selectChoicesCategories="selectChoicesCategories"
      v-else
    />
  </LayoutView>
</template>

<script>
import { onBeforeMount, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { LayoutView, LoaderView } from '@/components';
import { useCategoryStore } from '@/state';
import CategoryForm from '@/components/category/CategoryForm.vue';

export default {
  components: { LayoutView, LoaderView, CategoryForm },

  setup() {
    const toast = useToast();
    const router = useRouter();
    const store = useCategoryStore();
    const errors = computed(() => store.errors);
    const selectChoicesCategories = computed(() => store.selectCategories);
    const isLoading = computed(() => store.isLoading);
    const category = computed({
      get: () => store.category,
      set: (value) => (store.category = value),
    });

    const capitalizeFirstLetter = (str) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const submitForm = async () => {
      category.value.name = capitalizeFirstLetter(category.value.name);
      const response = await store.createCategory(category.value);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message, { timeout: 2000 });

        router.push({ name: 'admin-category-list' });
      } else {
        toast.error('Failed to create category');
      }
    };

    onBeforeMount(async () => {
      store.clearCategory();
      await store.getSelectCategories();
    });

    return {
      category,
      errors,
      selectChoicesCategories,
      isLoading,
      submitForm,
    };
  },
};
</script>
