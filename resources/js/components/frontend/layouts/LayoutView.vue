<template>
  <headerView />

  <div>
    <slot />
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';

export default {
  components: { HeaderView },
};
</script>
