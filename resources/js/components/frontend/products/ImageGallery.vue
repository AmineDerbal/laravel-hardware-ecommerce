<template>
  <div
    class="position-relative d-flex w-100 image-slider-container"
    @mouseenter="setImageGalleryHover(true)"
    @mouseleave="setImageGalleryHover(false)"
  >
    <Transition name="arrow-fade-left">
      <div
        class="position-absolute top-50 start-0 arrow"
        :class="{ 'd-none': !imageGalleryHover }"
        :key="'left-' + imageGalleryHover"
        @click="transitionImageGallery(index - 1, items)"
      >
        <i class="ri-arrow-left-s-line"></i>
      </div>
    </Transition>
    <Transition name="arrow-fade-right">
      <div
        class="position-absolute top-50 end-0 arrow"
        :class="{ 'd-none': !imageGalleryHover }"
        :key="'right-' + imageGalleryHover"
        @click="transitionImageGallery(index + 1, items)"
      >
        <i class="ri-arrow-right-s-line"></i>
      </div>
    </Transition>

    <div class="image-slider d-flex w-100">
      <TransitionGroup
        :name="
          slideDirection === 'left'
            ? 'slide-fade-left'
            : slideDirection === 'right'
            ? 'slide-fade-right'
            : null
        "
        appear
      >
        <img
          v-for="item in items"
          :key="`${item.index}-${slideDirection}`"
          :src="item.image"
          loading="lazy"
          alt="Product Image"
        />
      </TransitionGroup>
    </div>
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
    index: {
      type: Number,
      required: true,
      default: 0,
    },
    slideDirection: {
      type: String,
      required: true,
      default: null,
    },
  },

  methods: {
    transitionImageGallery(index, items) {
      this.$emit('transitionImageGallery', index, items);
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
.image-slider-container {
  width: 100%;
  overflow: hidden;
}

.image-slider img {
  width: 100%;
  min-width: 100%;
  object-fit: contain;
}
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

.slide-fade-right-enter-active,
.slide-fade-left-enter-active {
  transition: transform 0.3s ease-in-out;
}

.slide-fade-right-enter-from,
.slide-fade-left-enter-to {
  transform: translateX(-100%);
}
.slide-fade-down-enter-to,
.slide-fade-left-enter-from {
  transform: translateX(0);
}
</style>
