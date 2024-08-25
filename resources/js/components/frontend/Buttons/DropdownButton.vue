<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle text-white py-2"
      type="button"
      id="dropdownMenuButton1"
      aria-expanded="false"
      @mouseenter="toggleDropdown"
      @mouseleave="closeDropdown"
      @click.stop="toggleDropdown"
      @click="goToCategoryProductPage(item.slug)"
    >
      {{ item.name }}
    </button>
    <ul
      class="dropdown-menu"
      aria-labelledby="dropdownMenuButton1"
      :class="{ show: isDropdownVisible }"
      @mouseenter="toggleDropdown"
      @mouseleave="closeDropdown"
    >
      <div
        v-for="child in item.children"
        :key="child.id"
      >
        <li v-if="child.children.length <= 0">
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
        <DropendButton
          v-else
          :item="child"
        />
      </div>
    </ul>
  </div>
</template>

<script>
import DropendButton from './DropendButton.vue';
export default {
  components: {
    DropendButton,
  },
  name: 'DropdownButton',
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
    toggleDropdown() {
      this.isDropdownVisible = true;
    },
    closeDropdown() {
      this.isDropdownVisible = false;
    },

    goToCategoryProductPage(slug) {
      this.$router.push({ name: 'category-products', params: { slug } });
    },
  },
};
</script>

<style scoped>
.dropdown-menu {
  display: block;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.dropdown-menu.show {
  visibility: visible;
  opacity: 1;
}
</style>
