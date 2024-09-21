<template>
  <BCard
    no-body
    class="d-flex flex-column"
  >
    <img
      class="card-img-top img-fluid w-100 h-75 object-fit cursor-pointer"
      :src="item.image_url"
      alt="Card image cap"
      @click="viewProduct(item.slug)"
    />
    <BCardBody
      class="d-flex flex-column flex-grow-1 justify-content-between h-100"
    >
      <BCardTitle
        class="mb-2 text-start d-flex flex-column h-100 cursor-pointer"
        @click="viewProduct(item.slug)"
        >{{ item.name }}</BCardTitle
      >
      <p class="card-text whb-red-text fs-24 text-center">$ {{ item.price }}</p>
      <div class="text-end">
        <button
          type="button"
          class="btn btn-outline-danger btn-load whb-red-bg text-uppercase fs-16 text-white w-100"
          @click="handleAddToCartBtnClick(item.id)"
        >
          <span class="d-flex align-items-center justify-content-center">
            <span
              class="spinner-border flex-shrink-0"
              role="status"
              v-if="isLoading"
            >
            </span>
            <span
              class="flex-frow-1 ms-2"
              v-else
              >Add to cart
            </span>
          </span>
        </button>
      </div>
    </BCardBody>
  </BCard>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    item: {
      type: Object,
      Required: true,
    },
    isLoading: {
      type: Boolean,
      Required: true,
      default: false,
    },
  },
  methods: {
    viewProduct(slug) {
      this.$emit('viewProduct', slug);
    },
    handleAddToCartBtnClick(id) {
      this.$emit('handleAddToCartBtnClick', id);
    },
  },
};
</script>
