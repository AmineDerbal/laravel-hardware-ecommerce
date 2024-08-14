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
        :updateThumbnailImage="updateThumbnailImage"
        @addNewImage="addNewImage"
        @updateImage="updateImage"
        @deleteImage="deleteImage"
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
        router.push({ name: 'product-list' });
      } else {
        toast.error(response.data.message);
      }
    };

    const updateThumbnailImage = async () => {
      const response = await store.updateThumbnailImage();

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message, { timeout: 2000 });
        router.push({ name: 'product-list' });
      } else {
        toast.error(response.data.message);
      }
    };

    const addNewImage = async ({ product_id, image }) => {
      if (image) {
        const response = await store.addNewImage({
          product_id,
          image,
        });
        if (response.status === 200 || response.status === 201) {
          await store.getProduct(route.params.id);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
      return;
    };

    const updateImage = async (data) => {
      if (data.image) {
        const response = await store.updateImage(data);
        if (response.status === 200 || response.status === 201) {
          await store.getProduct(route.params.id);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        return;
      }
      return toast.error('Please select an image');
    };
    const deleteImage = async (id) => {
      const response = await store.deleteImage(id);
      if (response.status === 200 || response.status === 201) {
        await store.getProduct(route.params.id);
        toast.success(response.data.message);
      } else {
        toast.error('Failed to delete the image');
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
      updateThumbnailImage,
      addNewImage,
      updateImage,
      deleteImage,
    };
  },
};
</script>
