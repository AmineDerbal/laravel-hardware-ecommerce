<template>
  <div class="product-quantity-control d-flex">
    <button
      type="button"
      class="border border-2 border-gray bg-white fs-20 text-secondary w-25"
      @click="updateQuantity(quantity - 1)"
      :disabled="quantity <= 1"
    >
      -
    </button>
    <input
      type="number"
      class="border border-2 border-gray text-center fs-20 w-50"
      :value="quantity"
      readonly
    />
    <button
      type="button"
      class="border border-2 border-gray bg-white fs-20 text-secondary w-25"
      @click="updateQuantity(quantity + 1)"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductQuantityControl',
  props: {
    quantity: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: false,
      default: null,
    },
  },
  methods: {
    updateQuantity(value) {
      this.index !== null
        ? this.$emit('update', this.index, value)
        : this.$emit('update', value);
    },
  },
};
</script>

<style scoped>
.product-quantity-control {
  width: 120px;
}
input:focus {
  outline: none;
}
button:hover {
  background-color: var(--whb-red-bg) !important;
  color: white !important;
}
</style>
