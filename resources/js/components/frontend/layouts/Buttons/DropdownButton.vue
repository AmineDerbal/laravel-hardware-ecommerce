<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle text-white"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ item.name }}
    </button>
    <ul
      class="dropdown-menu"
      aria-labelledby="dropdownMenuButton1"
    >
      <li v-for="child in item.children">
        <a
          class="dropdown-item"
          href="#"
        >
          {{ child.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DropdownButton',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
