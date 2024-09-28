<template>
  <LayoutView></LayoutView>
</template>

<script>
import { computed } from 'vue';
import { LayoutView } from '@/components';
import { useUserStore } from '@/state';

export default {
  name: 'UserCart',
  components: { LayoutView },

  setup() {
    const userStore = useUserStore();
    const userCartItems = computed(() => userStore.user.cart_items);
    return { userCartItems };
  },
};
</script>
