<template>
  <div class="d-flexflex-column gap-1">
    <div class="image-slider d-flex flex-column justify-content-between gap-1">
      <TransitionGroup
        :name="
          getSlideDirection === 'up'
            ? 'slide-fade-up'
            : getSlideDirection === 'down'
            ? 'slide-fade-down'
            : 'slide'
        "
      >
        <div
          v-for="image in imageGallery"
          :key="getSlideDirection"
          class="cursor-pointer thumbnail-container"
          @click="changeImageIndex(image.index)"
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
      </TransitionGroup>
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
import { computed, ref, nextTick } from 'vue';

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

  computed() {
    return {
      getImageSlideDirection() {
        return this.imageSlideDirection;
      },

      getGalleryIndex() {
        return this.galleryIndex;
      },
    };
  },
  methods: {
    changeImageIndex(index) {
      this.$emit('changeImageIndex', index);
    },
  },

  setup(props) {
    const slideDirection = ref(null);
    const galleryIndex = ref(0);
    const gallery = ref([...props.items]);
    const imageGallery = computed(() => gallery.value);
    const getSlideDirection = computed(() => {
      return slideDirection.value;
    });

    const changeGalleryIndex = async (index) => {
      if (index < 0 || gallery.value.length - index < 3) {
        return;
      }

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
    };

    return {
      imageGallery,
      gallery,
      galleryIndex,
      getSlideDirection,
      changeGalleryIndex,
    };
  },
};
</script>
<style scoped>
.thumbnail-container {
  min-height: 200px; /* Ensures each image container is 1/3 of the gallery height */
}
.image-slider {
  height: 600px;
  overflow: hidden;
}

.slide-fade-up-enter-active,
.slide-fade-down-enter-active,
.slide-fade-up-leave-active {
  transition: transform 0.5s ease-in;
}

.slide-fade-up-leave-to {
  transform: translateY(-100%);
}
.slide-fade-up-leave-from {
  transform: translate(0);
}

.slide-fade-down-enter-from {
  transform: translateY(-100%);
}
.slide-fade-down-enter-to {
  transform: translateY(0);
}
</style>
