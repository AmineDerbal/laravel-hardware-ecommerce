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
      >
        <div
          v-for="image in gallery"
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
import { ref, nextTick, shallowRef } from 'vue';

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
  },

  methods: {
    changeImageIndex(index) {
      this.$emit('changeImageIndex', index);
    },
  },

  setup(props) {
    const slideDirection = ref(null);
    const galleryIndex = ref(0);
    const gallery = shallowRef([...props.items]);

    const lockScroll = () => {
      scrollPosition.value = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.value}px`;
      document.body.style.width = '100%';
    };

    const unlockScroll = () => {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollPosition.value);
    };

    const changeGalleryIndex = async (index) => {
      if (index < 0 || gallery.value.length - index < 3) {
        return;
      }
      //lockScroll();
      slideDirection.value = null;
      await nextTick();
      const oldGalleryIndex = galleryIndex.value;
      galleryIndex.value = index;

      if (index > oldGalleryIndex) {
        slideDirection.value = 'up';

        gallery.value.push(gallery.value.shift());
      } else {
        slideDirection.value = 'down';

        gallery.value.unshift(gallery.value.pop());
      }

      //await nextTick(); // Wait for the transition to complete
      // unlockScroll(); // Unlock scroll after transition
    };

    return {
      gallery,
      galleryIndex,
      changeGalleryIndex,
      slideDirection,
    };
  },
};
</script>
<style scoped>
.thumbnail-container {
  height: 200px;
  min-height: 200px;
  width: 100%;
  overflow: hidden;
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
.slide-fade-down-enter-active,
.slide-fade-up-leave-active {
  transition: transform 0.5s ease-in-out;
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
