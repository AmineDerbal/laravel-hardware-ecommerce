<template>
  <div class="w-50 d-flex align-self-center">
    <button
      type="button"
      class="border border-2 border-gray bg-white fs-24 text-secondary w-25"
      @click="updateQuantity(quantity - 1)"
      :disabled="quantity <= 1"
    >
      -
    </button>
    <input
      type="number"
      class="border border-2 border-gray text-center w-50"
      :value="quantity"
      readonly
    />
    <button
      type="button"
      class="border border-2 border-gray bg-white fs-24 text-secondary w-25"
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
  },
  methods: {
    updateQuantity(value) {
      this.$emit('update', value);
    },
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
button:hover {
  background-color: var(--whb-red-bg) !important;
  color: white !important;
}
</style>
