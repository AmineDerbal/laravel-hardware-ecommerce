<template>
  <li
    class="list-inline-item"
    v-b-tooltip.hover
    title="edit"
  >
    <router-link
      :to="{ name: `${item}-edit`, params: { id } }"
      class="text-primary d-inline-block"
    >
      <i class="ri-pencil-fill fs-16"></i>
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
  },
};
</script>
