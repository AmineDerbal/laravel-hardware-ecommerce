<template>
  <LayoutView>
    <div
      class="mt-5"
      v-if="product"
    >
      <div class="d-flex flex-lg-row flex-column w-100 px-5 vh-100">
        <div class="w-75 d-flex gap-1">
          <div class="d-lg-flex w-25 d-none flex-column gap-1">
            <SlideImage
              :items="gallery"
              :slideDirection="slideImageSliderDirection || 'null'"
              :currentImageIndex="currentImageIndex"
              :galleryIndex="galleryIndex"
              :animationDuration="animationDuration"
              @changeImageIndex="changeImageIndex"
              @changeGalleryIndex="changeGalleryIndex"
              :key="`${JSON.stringify(gallery)}`"
            />
          </div>
          <ImageGallery
            :items="imagesList"
            :index="currentImageIndex"
            :slideDirection="ImageGallerySliderDirection || 'null'"
            @transitionImageGallery="transitionImageGallery"
            :key="`${JSON.stringify(imagesList)}-${currentImageIndex}`"
          />
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
import ImageGallery from '@/components/frontend/products/ImageGallery.vue';
import { addItemToCart } from '@/utils/cartUtils';

export default {
  components: { LayoutView, ProductQuantityControl, SlideImage, ImageGallery },

  setup() {
    const store = useProductStore();
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const route = useRoute();
    const toast = useToast();

    const product = computed(() => store.product.product);
    const isLoading = ref(false);
    const screenWidth = ref(window.innerWidth);
    const imageGallery = ref([]);
    const gallery = ref([]);
    const imagesList = ref([]);
    const imageIndex = ref(0);
    const galleryIndex = ref(0);
    const slideImageSliderDirection = ref(null);
    const ImageGallerySliderDirection = ref(null);
    const animationDuration = ref(0.3);
    const productNumber = ref(1);

    const screenSizeIsLarge = computed(() => {
      return screenWidth.value >= 992;
    });

    const currentImageIndex = computed(() => {
      return imageIndex.value || 0;
    });

    const updateScreenWidth = () => (screenWidth.value = window.innerWidth);

    const updateImageList = (value) => {
      const newList = [...imageGallery.value];
      while (newList[0].index !== value) {
        newList.push(newList.shift());
      }
      imagesList.value = [...newList];
    };
    const changeImageIndex = (value) => {
      if (value < 0 || value >= imageGallery.value.length) {
        return;
      }
      slideImageSliderDirection.value = null;
      imageIndex.value = value;
      updateImageList(value);
    };

    const resetSliderDirection = () => {
      slideImageSliderDirection.value = null;
    };

    const delayedresetSliderFunction = () => {
      setTimeout(() => {
        resetSliderDirection();
      }, animationDuration.value * 1000);
    };

    const animateGallery = async (items) => {
      setTimeout(() => {
        items.push(items.shift());
        gallery.value = [...items];
        resetSliderDirection();
      }, animationDuration.value * 1000);
    };

    const handleGalleryChange = async (index, items) => {
      const oldGalleryIndex = galleryIndex.value;
      slideImageSliderDirection.value = null;
      if (index > oldGalleryIndex) {
        slideImageSliderDirection.value = 'up';
        galleryIndex.value = index;
        await animateGallery(items);
      } else {
        galleryIndex.value = index;
        slideImageSliderDirection.value = 'down';
        items.unshift(items.pop());
        gallery.value = [...items];
        delayedresetSliderFunction();
      }
    };

    const changeGalleryIndex = async (index, items) => {
      index >= 0 &&
        gallery.value.length - index >= 3 &&
        handleGalleryChange(index, items);
    };

    const updateGalleryPosition = async () => {
      if (galleryIndex.value - imageIndex.value >= 1) {
        await changeGalleryIndex(galleryIndex.value - 1, gallery.value);
      } else if (imageIndex.value - galleryIndex.value > 2) {
        await changeGalleryIndex(galleryIndex.value + 1, gallery.value);
      }
    };

    const updateImageGallery = async (index, oldIndex, items) => {
      if (index > oldIndex) {
        ImageGallerySliderDirection.value = 'left';
        setTimeout(() => {
          ImageGallerySliderDirection.value = null;
          items.push(items.shift());
          imagesList.value = [...items];
        }, animationDuration.value * 1000);
      } else {
        ImageGallerySliderDirection.value = 'right';
        items.unshift(items.pop());
        imagesList.value = [...items];
      }
      await updateGalleryPosition();
    };

    const handleImageTransition = async (index, items) => {
      const oldIndex = imageIndex.value;
      ImageGallerySliderDirection.value = null;
      imageIndex.value = index;
      await updateImageGallery(index, oldIndex, items);
    };

    const transitionImageGallery = async (index, items) => {
      if (index < 0 || index >= items.length) {
        return;
      }
      handleImageTransition(index, items);
    };

    const categoryParentPath = computed(
      () => store.product.category_parent_path,
    );

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
      gallery.value = [...imageGallery.value];
      imagesList.value = [...imageGallery.value];
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
      imagesList,
      gallery,
      galleryIndex,
      currentImageIndex,
      changeImageIndex,
      changeGalleryIndex,
      slideImageSliderDirection,
      ImageGallerySliderDirection,
      transitionImageGallery,
      animationDuration,
    };
  },
};
</script>
