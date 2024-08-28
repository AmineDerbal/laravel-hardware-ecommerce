<template>
  <LayoutView></LayoutView>
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
    const product = computed(() => store.product);

    const getSlug = () => route.params.slug;

    const getProduct = async () => {
      await store.getClientProudct(getSlug());
    };

    onBeforeMount(async () => {
      await getProduct();
    });

    return { product };
  },
};
</script>
