<template>
  <div class="m-5">
    <div class="new-products-title d-flex gray-bottom-border">
      <div class="red-bottom-border">
        <h1 class="mb-0 fw-bold text-uppercase text-black">Latest Products</h1>
      </div>
    </div>
  </div>
  <LatestProduct
    :items="latestProducts"
    :key="latestProducts"
  />
</template>

<script>
import { onBeforeMount, computed } from 'vue';
import { useProductStore } from '@/state';
import LatestProduct from '../products/LatestList.vue';
export default {
  name: 'HomeContent',
  components: { LatestProduct },
  setup() {
    const Productstore = useProductStore();
    const latestProducts = computed(() => Productstore.latest);

    const fetchLatestProducts = async () => {
      await Productstore.getLatest();
    };

    onBeforeMount(async () => {
      await fetchLatestProducts();
    });

    return {
      latestProducts,
    };
  },
};
</script>

<style scoped>
.red-bottom-border {
  border-bottom: 1px solid var(--whb-top-bar-bg);
}
.new-products-title div {
  margin-bottom: -1px;
}
</style>
