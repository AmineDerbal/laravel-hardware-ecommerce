<template>
  <div
    class="dropend"
    @mouseenter="toggleDropend"
    @mouseleave="closeDropend"
  >
    <button
      class="btn dropdown-item dropdown-toggle menu-right-icon"
      type="button"
      id="dropendMenuButton1"
      aria-expanded="false"
      @mouseenter="toggleDropend"
      @mouseleave="closeDropend"
      @click="goToCategoryProductPage(item.slug)"
    >
      {{ item.name }}
    </button>
    <ul
      class="dropdown-menu"
      :class="{ show: isDropdownVisible }"
      aria-labelledby="dropendMenuButton1"
      @mouseenter="toggleDropend"
      @mouseleave="closeDropend"
    >
      <li v-for="child in item.children">
        <router-link
          class="dropdown-item"
          :to="{
            name: 'category-products',
            params: { slug: child.slug },
          }"
        >
          {{ child.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DropendButton',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isDropdownVisible: false,
    };
  },
  methods: {
    toggleDropend() {
      console.log('start');
      this.isDropdownVisible = true;
      console.log(this.isDropdownVisible);
    },
    closeDropend() {
      this.isDropdownVisible = false;
      console.log(this.isDropdownVisible);
    },
    goToCategoryProductPage(slug) {
      this.$router.push({ name: 'category-products', params: { slug } });
    },
  },
};
</script>

<style scoped>
.menu-right-icon::after {
  content: '\f035f';
}
.dropdown-menu {
  position: absolute;
  top: 0;
  left: 100%;
  display: block;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
  transform: translateY(0);
}

.dropdown-menu.show {
  visibility: visible;
  opacity: 1;
}

.dropend .dropdown-menu {
  left: 100%;
}
</style>
