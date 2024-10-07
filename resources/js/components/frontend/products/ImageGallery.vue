<template>
  <div
    class="w-75 position-relative"
    @mouseenter="setImageGalleryHover(true)"
    @mouseleave="setImageGalleryHover(false)"
  >
    <Transition name="arrow-fade-left">
      <div
        class="position-absolute top-50 start-0 arrow"
        :class="{ 'd-none': !imageGalleryHover }"
        :key="'left-' + imageGalleryHover"
      >
        <i class="ri-arrow-left-s-line"></i>
      </div>
    </Transition>
    <Transition name="arrow-fade-right">
      <div
        class="position-absolute top-50 end-0 arrow"
        :class="{ 'd-none': !imageGalleryHover }"
        :key="'right-' + imageGalleryHover"
      >
        <i class="ri-arrow-right-s-line"></i>
      </div>
    </Transition>

    <img
      v-if="items.length > 0"
      :src="items[currentImageIndex].image"
      loading="lazy"
      class="img-fluid object-fit-contain w-100 h-100"
      alt="Product Image"
    />
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  name: 'ImageGallery',
  props: {
    items: {
      type: Array,
      required: true,
    },
    currentImageIndex: {
      type: Number,
      required: true,
    },
  },

  setup() {
    const imageGalleryHover = ref(false);
    const setImageGalleryHover = (value) => {
      imageGalleryHover.value = value;
    };
    return {
      imageGalleryHover,
      setImageGalleryHover,
    };
  },
};
</script>

<style scoped>
.arrow {
  cursor: pointer;
  font-size: 3rem;
}

.arrow-fade-left-enter-active,
.arrow-fade-left-leave-active,
.arrow-fade-right-enter-active,
.arrow-fade-right-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.arrow-fade-left-enter-from,
.arrow-fade-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.arrow-fade-right-enter-from,
.arrow-fade-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.arrow-fade-left-enter-to,
.arrow-fade-left-leave-from,
.arrow-fade-right-enter-to,
.arrow-fade-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
