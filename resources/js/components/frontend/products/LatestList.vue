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
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useCartStore, useUserStore } from '@/state';
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

    const user = computed(() => userStore.user);
    const isLoading = ref({});
    const setLoadingValue = (id, value) => {
      isLoading.value = { ...isLoading.value, [id]: value };
    };

    const isUserLoggedIn = computed(() =>
      user.value.isAuthenticated && user.value.name && user.value.email
        ? true
        : false,
    );

    const handleAddToCartBtnClick = async (product_id) => {
      if (!isUserLoggedIn.value) {
        toast.error('Please login to add product to cart');
        return;
      }

      const { id, cart_id } = userStore.checkIfItemIsInCart(product_id) || {};

      const item = {
        user_id: user.value.id,
        product_id,
        quantity: 1,
        id,
        cart_id,
      };

      setLoadingValue(product_id, true);
      const result = await cartStore.addItemToCart(item);
      if (result.status === 200) {
        const response = await userStore.fetchUserActiveCartItems(
          user.value.id,
        );
        if (response.status !== 200) toast.error(response.data.message);
      }
      setLoadingValue(product_id, false);
      result.status !== 200
        ? toast.error(result.data.message)
        : toast.success(result.data.message);
    };

    const viewProduct = (slug) => {
      router.push({ name: 'product-show', params: { slug } });
    };

    return {
      viewProduct,
      isUserLoggedIn,
      isLoading,
      handleAddToCartBtnClick,
    };
  },
};
</script>
