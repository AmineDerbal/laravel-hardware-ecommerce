<template>
  <div class="d-flex flex-column min-vh-100">
    <headerView />

    <div class="flex-grow-1">
      <slot />
    </div>

    <footerView />
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import FooterView from './FooterView.vue';

export default {
  components: { HeaderView, FooterView },
};
</script>
