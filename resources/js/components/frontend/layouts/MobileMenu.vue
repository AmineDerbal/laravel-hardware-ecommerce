<template>
  <div
    class="d-block d-lg-none w-100 h-100 top-0 left-0 mobile-menu-modal position-fixed overflow-hidden"
  ></div>
</template>

<script>
export default {
  name: 'MobileMenu',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.mobile-menu-modal {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
}
</style>
