<template>
  <div
    class="d-flex justify-content-end w-100 h-100 top-0 left-0 cart-modal position-fixed overflow-hidden"
    @click="SetShowModal"
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
          @click="SetShowModal"
        >
          <i class="ri-close-line fs-24"></i>
          Close</span
        >
      </div>
      <div class="w-100 gray-bottom-border mt-3"></div>
      <div class="p-2 d-flex flex-column justify-content-between">
        <div
          v-for="item in items"
          :key="item.id"
          class="mt-3"
        >
          <CartItem :item="item" />
        </div>
        <div>
          <div class="w-100 gray-bottom-border mt-3"></div>
          <div>
            <p class="fs-20 fw-bold d-flex justify-content-between">
              Total Price: <span class="whb-red-text"> ${{ totalPrice }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductQuantityControl, CartItem } from '@/components';

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
  components: { ProductQuantityControl, CartItem },

  setup(props, { emit }) {
    const SetShowModal = () => {
      emit('setShowCartModal', false);
    };

    return {
      SetShowModal,
    };
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
