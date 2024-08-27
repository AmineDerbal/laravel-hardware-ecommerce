<template>
  <div
    class="d-block d-lg-none w-100 h-100 top-0 left-0 mobile-menu-modal position-fixed overflow-hidden"
    @click="setShowMenu"
  >
    <div
      class="mobile-menu w-50 h-100 position-relative bg-white overflow-auto"
      @click.stop
    >
      <div class="w-fit d-flex justify-content-end mx-2">
        <span
          class="fw-semibold ms-1 d-flex align-items-center cursor-pointer"
          style="cursor: pointer"
          @click="setShowMenu"
        >
          <i class="ri-close-line fs-24"></i>
          Close</span
        >
      </div>
      <div>
        <div class="d-flex justify-content-start align-items-center">
          <div
            class="mobile-header w-50 p-4 d-flex align-items-center justify-content-center"
          >
            <p
              class="fw-bold mb-0 text-uppercase text-center mobile-header-title"
            >
              Categories
            </p>
          </div>
        </div>
        <div
          v-for="item in items"
          :key="item.id"
          class="w-100"
        >
          <div
            v-if="item.children.length < 1"
            class="p-3 d-flex w-100 align-items-center gray-border cursor-pointer"
            @click="goToCategoryProductPage(item.slug)"
          >
            <p class="fw-bold text-uppercase hover-header-link">
              {{ item.name }}
            </p>
          </div>

          <MobileDropdown
            v-else
            :item="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MobileDropdown from '../Buttons/MobileDropdown.vue';
export default {
  name: 'MobileMenu',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: {
    MobileDropdown,
  },

  methods: {
    setShowMenu() {
      this.$emit('setShowMenu', false);
    },
    goToCategoryProductPage(slug) {
      this.$router.push({ name: 'category-products', params: { slug } });
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
.mobile-menu {
  min-width: 200px;
}
.mobile-header {
  background-color: rgba(0, 0, 0, 0.04);
  border-top: 1px solid rgba(0, 0, 0, 0.105);
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.105); */
  border-bottom: 1px solid var(--whb-top-bar-bg);
}
</style>
