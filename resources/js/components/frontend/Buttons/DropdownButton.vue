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
      class="dropdown-menu mt-3"
      aria-labelledby="dropdownMenuButton1"
    >
      <div v-for="child in item.children">
        <li v-if="child.children.length <= 0">
          <a
            class="dropdown-item"
            href="#"
          >
            {{ child.name }}
          </a>
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
};
</script>
