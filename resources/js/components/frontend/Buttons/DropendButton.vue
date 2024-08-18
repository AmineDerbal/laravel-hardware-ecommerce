<template>
  <div
    class="dropend"
    @click.stop="toggleDropdown"
  >
    <button
      class="btn dropdown-item dropdown-toggle menu-right-icon"
      type="button"
      id="dropendMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ item.name }}
    </button>
    <ul
      class="dropdown-menu"
      aria-labelledby="dropendMenuButton1"
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
};
</script>

<style scoped>
.menu-right-icon::after {
  content: '\f035f';
}
</style>
