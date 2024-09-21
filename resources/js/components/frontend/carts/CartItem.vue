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
    <div>
      <span
        class="ms-1 d-flex align-items-center cursor-pointer"
        style="cursor: pointer"
        @click="emitDeleteItem"
      >
        <i class="ri-close-line fs-24"></i>
      </span>
    </div>
  </div>

  <div class="d-flex flex-column align-items-center gap-2">
    <ProductQuantityControl
      :quantity="item.quantity"
      @update="emitUpdateQuantity"
    />
    <p class="w-50 text-muted">
      {{ item.quantity }} x
      <span class="whb-red-text">${{ item.product.price }}</span>
    </p>
  </div>
</template>

<script>
import { ProductQuantityControl } from '@/components';

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: { ProductQuantityControl },
  emits: ['updateItemQuantity', 'deleteItem'],
  methods: {
    emitUpdateQuantity(quantity) {
      const { id, cart_id, product_id } = this.item;
      this.$emit('updateItemQuantity', {
        id,
        cart_id,
        product_id,
        quantity,
      });
    },
    emitDeleteItem() {
      this.$emit('deleteItem', this.item.id);
    },
  },
};
</script>
