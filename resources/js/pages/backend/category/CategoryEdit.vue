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
import { onBeforeMount, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { LayoutView, LoaderView, CategoryForm } from '@/components';
import { useCategoryStore } from '@/state';

export default {
  components: {
    LayoutView,
    LoaderView,
    CategoryForm,
  },

  setup() {
    const store = useCategoryStore();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const category = computed({
      get: () => store.category,
      set: (value) => (store.category = value),
    });
    const selectChoicesCategories = computed(() => store.selectCategories);
    const isLoading = ref(false);
    const errors = computed(() => store.errors);

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
        toast.error('Failed to update category');
      }
    };

    onBeforeMount(async () => {
      const id = route.params.id;
      isLoading.value = true;
      await store.getCategory(id);
      await store.getSelectCategories();
      isLoading.value = false;
    });

    return { selectChoicesCategories, category, errors, submitForm };
  },
};
</script>
