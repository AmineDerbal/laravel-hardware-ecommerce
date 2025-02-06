<template>
  <div
    class="d-flex justify-content-end w-100 h-100 top-0 left-0 cart-modal position-fixed"
    @click="setShowModal"
  >
    <div
      class="w-25 h-100 position-relative bg-white overflow-auto cart"
      @click.stop
    >
      <div class="d-flex justify-content-between align-items-center mt-3 mx-1">
        <p class="fw-semibold mb-0 ms-2 fs-18">Shopping Cart</p>
        <span
          class="fw-semibold ms-1 d-flex align-items-center cursor-pointer"
          style="cursor: pointer"
          @click="setShowModal"
        >
          <i class="ri-close-line fs-24"></i>
          Close</span
        >
      </div>
      <div class="w-100 gray-bottom-border mt-3"></div>
      <div
        class="p-2 d-flex flex-column justify-content-between"
        v-if="items.length > 0"
      >
        <div
          v-for="item in items"
          :key="item.id"
          class="mt-3"
        >
          <CartItem
            :item="item"
            :isLoading="isLoading[item.id]"
            @updateItemQuantity="updateItemQuantity"
            @deleteItem="deleteCartItem"
          />
        </div>
        <div>
          <div class="w-100 gray-bottom-border mt-3"></div>
          <div>
            <p class="fs-20 fw-bold d-flex justify-content-between">
              Total Price: <span class="whb-red-text"> ${{ totalPrice }}</span>
            </p>
            <button
              type="button"
              class="btn btn-outline-secondary btn-load w-100 text-uppercase mb-2"
            >
              Go to Cart
            </button>
            <button
              type="button"
              class="btn btn-outline-danger w-100 btn-load whb-red-bg text-uppercase text-white"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useCartStore, useUserStore } from '@/state';
import { CartItem } from '@/components';

export default {
  name: 'CartModal',
  props: {
    items: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  components: { CartItem },
  methods: {
    setShowModal() {
      this.$emit('setShowCartModal', false);
    },
  },
  setup() {
    const cartStore = useCartStore();
    const userStore = useUserStore();
    const toast = useToast();
    const isLoading = ref({});
    const setLoadingValue = (id, value) => {
      isLoading.value = { ...isLoading.value, [id]: value };
    };

    const updateItemQuantity = async (data) => {
      setLoadingValue(data.id, true);
      data.user_id = userStore.user.id;
      const result = await cartStore.updateItemCartQuantity(data);
      if (result.status === 200) {
        const response = await userStore.fetchUserActiveCartItems(data.user_id);
        await userStore.calculateTotalPrice();
        if (response.status !== 200) toast.error(response.data.message);
      }
      setLoadingValue(data.id, false);
      result.status !== 200
        ? toast.error(result.data.message)
        : toast.success(result.data.message);
    };

    const deleteCartItem = async (id) => {
      setLoadingValue(id, true);
      const result = await cartStore.deleteCartItem(id);
      if (result.status === 200) {
        const response = await userStore.fetchUserActiveCartItems(
          userStore.user.id,
        );
        await userStore.calculateTotalPrice();
        if (response.status !== 200) toast.error(response.data.message);
      }
      setLoadingValue(id, false);
      result.status !== 200
        ? toast.error(result.data.message)
        : toast.success(result.data.message);
    };
    return { isLoading, updateItemQuantity, deleteCartItem };
  },
};
</script>

<style scoped>
.cart-modal {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
}
.cart {
  min-width: 275px;
}
</style>
