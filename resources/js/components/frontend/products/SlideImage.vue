<template>
  <div
    class="d-flexflex-column gap-1"
    lazyload
  >
    <div class="image-slider d-flex flex-column justify-content-between">
      <TransitionGroup
        :name="
          slideDirection === 'up'
            ? 'slide-fade-up'
            : slideDirection === 'down'
            ? 'slide-fade-down'
            : null
        "
        appear
      >
        <div
          v-for="image in items"
          :key="`${image.index}-${slideDirection}`"
          class="cursor-pointer thumbnail-container d-flex justify-content-center align-items-center"
          @click="changeImageIndex(image.index)"
        >
          <img
            :src="image.image"
            class="h-100 object-fit-contain overflow-hidden"
            loading="lazy"
            :class="[
              image.index === currentImageIndex ? 'opacity-50' : 'opacity-100',
            ]"
            alt="Product Image"
          />
        </div>
      </TransitionGroup>
    </div>
    <div
      class="d-flex gap-1 align-items-center justify-content-center gallery-control"
    >
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="changeGalleryIndex(galleryIndex - 1, items)"
      >
        <i class="ri-arrow-up-s-line"></i>
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="changeGalleryIndex(galleryIndex + 1, items)"
      >
        <i class="ri-arrow-down-s-line"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideImage',

  props: {
    items: {
      type: Array,
      required: true,
    },
    currentImageIndex: {
      type: Number,
      required: true,
    },
    slideDirection: {
      type: String,
      required: true,
      default: null,
    },
    galleryIndex: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  methods: {
    changeImageIndex(index) {
      this.$emit('changeImageIndex', index);
    },
    changeGalleryIndex(index, items) {
      this.$emit('changeGalleryIndex', index, items);
    },
  },
};
</script>
<style scoped>
.thumbnail-container {
  height: 200px;
  min-height: 200px;
  width: 100%;
}

.gallery-control,
.image-slider {
  width: 150px;
}
.image-slider {
  height: 600px;
  scroll-behavior: smooth;
  overflow: hidden;
}

.slide-fade-up-enter-active,
.slide-fade-down-enter-active {
  transition: transform 0.5s ease-in-out;
}

.slide-fade-up-enter-from {
  transform: translateY(100%);
}

.slide-fade-up-enter-to {
  transform: translate(0);
}

.slide-fade-up-leave-to,
.slide-fade-down-enter-from {
  transform: translateY(-100%);
}
.slide-fade-up-leave-from,
.slide-fade-down-enter-to {
  transform: translate(0);
}
</style>
