<template>
  <div class="d-flex mb-2 gap-2">
    <div class="w-25 position-relative">
      <div
        v-if="isLoading"
        class="position-absolute top-50 start-50 translate-middle w-100 h-100 d-flex justify-content-center align-items-center"
        style="background-color: rgba(255, 255, 255, 0.7)"
      >
        <div
          class="spinner-border text-secondary"
          role="status"
        ></div>
      </div>

      <img
        :src="item.product.image"
        :class="{ 'opacity-50': isLoading }"
        class="rounded w-100"
      />
    </div>
    <p class="w-75">{{ item.product.name }}</p>
  </div>

  <div class="d-flex flex-column align-items-center gap-2">
    <ProductQuantityControl
      :quantity="item.quantity"
      @update="updateItemQuantity"
    />
    <p class="w-50 text-muted">
      {{ item.quantity }} x
      <span class="whb-red-text">${{ item.product.price }}</span>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useCartStore, useUserStore } from '@/state';
import { ProductQuantityControl } from '@/components';

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: { ProductQuantityControl },
  setup(props) {
    const cartStore = useCartStore();
    const userStore = useUserStore();
    const toast = useToast();
    const isLoading = ref(false);

    const updateItemQuantity = async (newQuantity) => {
      isLoading.value = true;
      const itemData = {
        id: props.item.id,
        quantity: newQuantity,
        cart_id: props.item.cart_id,
        product_id: props.item.product_id,
        user_id: userStore.user.id,
      };
      const result = await cartStore.updateItemCartQuantity(itemData);
      if (result.status !== 200) {
        toast.error(result.data.message);
        isLoading.value = false;
        return;
      }
      const response = await userStore.fetchUserActiveCartItems(
        userStore.user.id,
      );
      if (response.status !== 200) {
        toast.error(response.data.message);
        isLoading.value = false;
        return;
      }

      isLoading.value = false;
      toast.success(result.data.message);
    };

    return {
      updateItemQuantity,
      isLoading,
    };
  },
};
</script>
