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
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartModal',

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
  min-width: 150px;
}
</style>
