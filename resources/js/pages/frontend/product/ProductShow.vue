<template>
  <LayoutView>
    <div
      class="mt-5"
      :key="product"
      v-if="product && product.id"
    >
      <div class="d-flex w-100 px-5">
        <div class="w-75 d-flex gap-1">
          <div class="image-gallery w-25">
            <img
              :src="product.image_url"
              class="img-fluid opacity-50"
              alt="Product Image"
            />
          </div>
          <div>
            <img
              :src="product.image_url"
              loading="lazy"
              class="img-fluid"
              alt="Product Image"
            />
          </div>
        </div>
        <div class="w-25">
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
            <div>
              <div class="input-step d-flex">
                <BButton
                  type="button"
                  @click="setProductNumber(productNumber - 1)"
                  >–</BButton
                >
                <input
                  type="number"
                  v-model="productNumber"
                  readonly
                />
                <BButton
                  type="button"
                  @click="setProductNumber(productNumber + 1)"
                  >+</BButton
                >
              </div>
            </div>

            <BButton
              class="w-100 btn btn-outline-danger whb-red-bg text-uppercase fs-16 text-white"
              @click="addToCart(product.id, productNumber)"
              >Add to cart</BButton
            >
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
          <div class="description"></div>
        </div>
      </div>
    </div>
  </LayoutView>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/state';
import { LayoutView } from '@/components';
export default {
  components: { LayoutView },

  setup() {
    const store = useProductStore();
    const route = useRoute();
    const router = useRouter();
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

    const getProduct = async () => {
      await store.getClientProudct(getSlug());
    };

    onBeforeMount(async () => {
      await getProduct();
      console.log(product.value);
      console.log(categoryParentPath.value);
    });

    return { product, categoryParentPath, productNumber, setProductNumber };
  },
};
</script>
