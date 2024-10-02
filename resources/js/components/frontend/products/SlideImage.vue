<template>
  <div class="d-lg-flex d-none flex-column gap-1">
    <div
      class="image-slider d-lg-flex d-none flex-column justify-content-between gap-1"
    >
      <div
        v-for="image in items"
        :key="slideDirection"
        class="cursor-pointer thumbnail-container"
        @click="changeImageIndex(image.index)"
        v-show="image.show"
      >
        <img
          :src="image.image"
          class="h-100 object-fit-cover"
          loading="lazy"
          :class="[
            image.index === currentImageIndex ? 'opacity-50' : 'opacity-100',
          ]"
          alt="Product Image"
        />
      </div>
    </div>
    <div class="d-flex gap-1 align-items-center">
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="changeGalleryIndex(galleryIndex - 1)"
      >
        <i class="ri-arrow-up-s-line"></i>
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="changeGalleryIndex(galleryIndex + 1)"
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
    galleryIndex: {
      type: Number,
      required: true,
    },
    slideDirection: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeImageIndex(index) {
      this.$emit('changeImageIndex', index);
    },

    changeGalleryIndex(index) {
      // update the gallery index first

      this.$emit('changeGalleryIndex', index);
    },
  },
};
</script>
<style scoped>
.thumbnail-container {
  min-height: 200px; /* Ensures each image container is 1/3 of the gallery height */
}
.image-slider {
  height: 600px;
  overflow-y: hidden;
}

.slide-fade-up-leave-active,
.slide-fade-down-leave-active {
  transition: transform 0.5s ease-in-out;
}

.slide-fade-up-leave-to {
  transform: translateY(-100%);
}

.slide-fade-down-leave-to {
  transform: translateY(100%);
}

.slide-fade-down-leave-from,
.slide-fade-up-leave-from {
  transform: translateY(0);
}
</style>
