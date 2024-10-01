<template>
  <LayoutView>
    <div
      class="mt-5"
      :key="product"
      v-if="product && product.id"
    >
      <div class="d-flex flex-lg-row flex-column w-100 px-5 vh-100">
        <div class="w-75 d-flex gap-1">
          <div class="d-lg-flex w-25 d-none flex-column gap-1">
            <div
              class="image-slider d-flex flex-column flex-nowrap justify-content-between gap-1"
            >
              <TransitionGroup
                :name="
                  imageSlideDirection === 'up'
                    ? 'slide-fade-up'
                    : imageSlideDirection === 'down'
                    ? 'slide-fade-down'
                    : ''
                "
              >
                <div
                  v-for="image in imageGallery"
                  :key="imageSlideDirection"
                  class="cursor-pointer thumbnail-container"
                >
                  <img
                    :src="image.image"
                    class="h-100 w-25 object-fit-cover"
                    loading="lazy"
                    :class="[
                      image.index === currentImageIndex
                        ? 'opacity-50'
                        : 'opacity-100',
                    ]"
                    alt="Product Image"
                    @click="changeImageIndex(image.index)"
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
          <div class="image-gallery">
            <img
              :src="imageGallery[currentImageIndex].image"
              loading="lazy"
              class="img-fluid object-fit-cover w-100 h-100"
              alt="Product Image"
            />
          </div>
        </div>
        <div :class="screenSizeIsLarge ? 'w-25' : 'w-100'">
          <nav aria-label="breadcrumb">
            <BBreadcrumb>
              <BBreadcrumbItem>
                <RouterLink to="/">Home</RouterLink></BBreadcrumbItem
              >
              <BBreadcrumbItem
                v-for="(item, index) in categoryParentPath"
                :active="index === categoryParentPath.length - 1"
                :key="item.slug"
              >
                <RouterLink
                  v-if="index !== categoryParentPath.length - 1"
                  :to="{
                    name: 'category-products',
                    params: { slug: item.slug },
                  }"
                  >{{ item.name }}</RouterLink
                >
                <span
                  class="text-primary fw-bold"
                  v-else
                  >{{ item.name }}</span
                >
              </BBreadcrumbItem>
            </BBreadcrumb>
          </nav>

          <h1 class="mt-3">{{ product.name }}</h1>
          <p class="card-text whb-red-text fs-24 fw-bold mt-4">
            $ {{ product.price }}
          </p>
          <div class="gy-4 d-flex gap-2">
            <ProductQuantityControl
              :quantity="productNumber"
              @update="setProductNumber"
            />

            <button
              type="button"
              class="btn btn-outline-danger btn-load whb-red-bg text-uppercase text-white"
              @click="addToCart"
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
        </div>
      </div>

      <div
        class="mt-5 gray-top-border"
        v-if="product.description"
      >
        <div class="w-100 d-flex justify-content-center">
          <span class="text-uppercase fs-16 fw-bold red-top-border"
            >Description</span
          >
        </div>
        <div class="description px-5">
          <div v-html="product.description"></div>
        </div>
      </div>
    </div>
  </LayoutView>
</template>

<script>
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useProductStore, useUserStore, useCartStore } from '@/state';
import { LayoutView, ProductQuantityControl } from '@/components';
import { addItemToCart } from '@/utils/cartUtils';

export default {
  components: { LayoutView, ProductQuantityControl },

  setup() {
    const store = useProductStore();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const route = useRoute();
    const toast = useToast();
    const isLoading = ref(false);

    const screenWidth = ref(window.innerWidth);

    const updateScreenWidth = () => {
      screenWidth.value = window.innerWidth;
    };
    const screenSizeIsLarge = computed(() => {
      return screenWidth.value >= 992;
    });

    const imageGallery = ref([
      {
        image: '',
        index: 0,
      },
    ]);
    const gallerySize = ref(3);
    const galleryIndex = ref(0);
    const imageIndex = ref(0);
    const imageSlideDirection = ref(null);
    const currentImageIndex = computed(() => {
      return imageIndex.value || 0;
    });

    const visibleGallery = computed(() => {
      return imageGallery.value
        .slice(galleryIndex.value, galleryIndex.value + gallerySize.value)
        .map((image) => image.index);
    });

    const changeGalleryIndex = async (value) => {
      if (value < 0 || imageGallery.value.length - value < gallerySize.value) {
        return;
      }

      const oldGalleryIndex = galleryIndex.value;
      galleryIndex.value = value;
      value > oldGalleryIndex
        ? (imageSlideDirection.value = 'up')
        : (imageSlideDirection.value = 'down');
    };

    const changeImageIndex = (value) => {
      if (value < 0 || value >= imageGallery.value.length) {
        return;
      }
      imageIndex.value = value;
    };

    const product = computed(() => store.product.product);

    const categoryParentPath = computed(
      () => store.product.category_parent_path,
    );
    const productNumber = ref(1);

    const setProductNumber = (value) => {
      if (value < 1) {
        return;
      }
      productNumber.value = value;
    };
    const getSlug = () => route.params.slug;

    const addToCart = async () => {
      const data = {
        product_id: product.value.id,
        quantity: productNumber.value,
      };
      await addItemToCart(cartStore, userStore, toast, data, isLoading, false);
    };

    const getProduct = async () => {
      await store.getClientProudct(getSlug());
      imageGallery.value = [
        { image: product.value.image_url, index: 0 },
        ...product.value.images.map((img, index) => ({
          image: img.image_url,
          index: index + 1,
        })),
      ];

      console.log(visibleGallery.value);
    };

    onBeforeMount(async () => {
      await getProduct();
      window.addEventListener('resize', updateScreenWidth);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateScreenWidth);
    });

    return {
      product,
      categoryParentPath,
      productNumber,
      setProductNumber,
      addToCart,
      isLoading,
      screenSizeIsLarge,
      visibleGallery,
      imageGallery,
      currentImageIndex,
      changeImageIndex,
      changeGalleryIndex,
      galleryIndex,
      imageSlideDirection,
    };
  },
};
</script>

<style scoped>
.image-gallery {
  height: auto;
  width: 80%; /* Ensures it does not exceed the container's height */
}

.thumbnail-container {
  min-height: 200px; /* Ensures each image container is 1/3 of the gallery height */
}
.image-slider {
  height: 600px;
  overflow-y: hidden;
}

.slide-fade-up-enter-active,
.slide-fade-up-leave-active,
.slide-fade-down-enter-active,
.slide-fade-down-leave-active {
  transition: opacity 0.1s ease, transform 1s ease;
}

.slide-fade-up-leave-to {
  transform: translateY(-100%);
}
/* .slide-fade-down-leave-to {
  transform: translateY(100%);
  opacity: 1;
} */

.slide-fade-up-leave-from {
  transform: translateY(0);
  display: block;
}

/* .slide-fade-down-leave-from {
  transform: translateY(-50%);
  opacity: 1;
} */

.slide-fade-up-enter-to {
  transform: translateY(0);
}
/* .slide-fade-down-enter-to {
  transform: translateY(-50%);
} */

.slide-fade-up-enter-from {
  transform: translateY(100%);
}
/* .slide-fade-down-enter-from {
  transform: translateY(-150%);
} */
</style>
