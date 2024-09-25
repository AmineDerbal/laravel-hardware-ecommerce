<template>
  <BCard
    no-body
    class="d-flex flex-column"
    @mouseover="itemHovered = true"
    @mouseleave="itemHovered = false"
  >
    <div class="position-relative h-75 image-container cursor-pointer">
      <img
        class="card-img-top img-fluid w-100 h-100 object-fit"
        :src="item.image_url"
        alt="Card image cap"
        @click="viewProduct(item.slug)"
      />
      <div
        class="text-end position-absolute d-none w-100 bottom-0 left-0"
        :class="[
          { hoverd: itemHovered },
          cartBtnHovered ? 'opacity-100' : 'opacity-75',
        ]"
      >
        <button
          type="button"
          class="btn btn-load btn-outline-danger whb-red-bg text-uppercase fs-16 text-white w-100 rounded-0"
          @click="handleAddToCartBtnClick(item.id)"
          @mouseover="cartBtnHovered = true"
          @mouseleave="cartBtnHovered = false"
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
            >
              <Transition
                name="vertical-slide"
                mode="out-in"
              >
                <!-- Switch between cart icon and text based on hover -->
                <i
                  v-if="cartBtnHovered"
                  class="ri-shopping-cart-2-line"
                  key="icon"
                ></i>
                <span
                  v-else
                  key="text"
                  >Add to cart</span
                >
              </Transition>
            </span>
          </span>
        </button>
      </div>
    </div>
    <BCardBody
      class="d-flex flex-column flex-grow-1 justify-content-between h-100"
    >
      <BCardTitle
        class="mb-2 text-start d-flex flex-column h-100 cursor-pointer"
        @click="viewProduct(item.slug)"
        >{{ item.name }}</BCardTitle
      >
      <p class="card-text whb-red-text fs-24 text-center">$ {{ item.price }}</p>
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

  data() {
    return {
      itemHovered: false,
      cartBtnHovered: false,
    };
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

<style scoped>
.hoverd {
  display: block !important;
}
.btn-outline-danger:hover {
  background-color: var(--whb-red-bg) !important;
}
.vertical-slide-enter-active,
.vertical-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.vertical-slide-enter-from,
.vertical-slide-leave-to {
  opacity: 0;
  transform: translateY(50px); /* Slide up from below */
}

.vertical-slide-enter-to,
.vertical-slide-leave-from {
  opacity: 1;
  transform: translateY(0); /* Move to the original position */
}

.vertical-slide-leave-active {
  opacity: 1;
  transform: translateY(0); /* Start from the original position */
}

.vertical-slide-leave-to {
  opacity: 0;
  transform: translateY(-50px); /* Slide up and disappear */
}
</style>
