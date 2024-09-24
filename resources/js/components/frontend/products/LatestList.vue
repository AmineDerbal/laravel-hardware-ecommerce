<template>
  <BRow class="g-3 mx-5">
    <BCol
      cols="12"
      xs="6"
      sm="6"
      md="4"
      lg="3"
      class="d-flex align-items-stretch"
      v-for="item in items"
      :key="item.id"
    >
      <ProductItem
        :item="item"
        :isLoading="isLoading[item.id]"
        @viewProduct="viewProduct"
        @handleAddToCartBtnClick="handleAddToCartBtnClick"
      />
    </BCol>
  </BRow>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useCartStore, useUserStore } from '@/state';
import { addItemToCart } from '@/utils/cartUtils';
import ProductItem from './ProductItem.vue';

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: { ProductItem },

  setup() {
    const router = useRouter();
    const cartStore = useCartStore();
    const userStore = useUserStore();
    const toast = useToast();

    const isLoading = ref({});

    const handleAddToCartBtnClick = async (product_id) => {
      const data = {
        product_id,
        quantity: 1,
      };
      await addItemToCart(cartStore, userStore, toast, data, isLoading, true);
    };

    const viewProduct = (slug) => {
      router.push({ name: 'product-show', params: { slug } });
    };

    return {
      viewProduct,
      isLoading,
      handleAddToCartBtnClick,
    };
  },
};
</script>
