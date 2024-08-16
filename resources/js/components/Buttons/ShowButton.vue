<template>
  <li
    class="list-inline-item"
    v-b-tooltip.hover
    title="show"
  >
    <router-link
      :to="{ name: `admin-${item}-show`, params: { id } }"
      class="text-success d-inline-block"
    >
      <i class="ri-eye-fill fs-16"></i>
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
