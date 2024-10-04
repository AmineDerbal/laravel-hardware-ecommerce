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
            <SlideImage
              :items="imageGallery"
              :currentImageIndex="currentImageIndex"
              @changeImageIndex="changeImageIndex"
              :key="imageGallery"
              v-if="imageGallery.length > 0 && screenSizeIsLarge"
            />
          </div>
          <div
            class="image-gallery w-75 position-relative"
            @mouseenter="setImageGalleryHover(true)"
            @mouseleave="setImageGalleryHover(false)"
          >
            <div
              class="position-absolute top-50 start-0 arrow"
              :class="{ 'd-none': !imageGalleryHover }"
            >
              <i class="ri-arrow-left-s-line"></i>
            </div>

            <img
              :src="imageGallery[currentImageIndex].image"
              loading="lazy"
              class="img-fluid object-fit-cover w-100 h-100"
              alt="Product Image"
            />
            <div
              class="position-absolute top-50 end-0 arrow"
              :class="{ 'd-none': !imageGalleryHover }"
            >
              <i class="ri-arrow-right-s-line"></i>
            </div>
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
import SlideImage from '@/components/frontend/products/SlideImage.vue';
import { addItemToCart } from '@/utils/cartUtils';

export default {
  components: { LayoutView, ProductQuantityControl, SlideImage },

  setup() {
    const store = useProductStore();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const route = useRoute();
    const toast = useToast();
    const isLoading = ref(false);
    const imageGalleryHover = ref(false);

    const setImageGalleryHover = (value) => {
      imageGalleryHover.value = value;
    };

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

    const imageIndex = ref(0);
    const currentImageIndex = computed(() => {
      return imageIndex.value || 0;
    });

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
      imageGallery,
      currentImageIndex,
      changeImageIndex,
      imageGalleryHover,
      setImageGalleryHover,
    };
  },
};
</script>

<style scoped>
.image-gallery {
  height: auto;
  /* Ensures it does not exceed the container's height */
}

.arrow {
  cursor: pointer;
  font-size: 3rem;
}
</style>
