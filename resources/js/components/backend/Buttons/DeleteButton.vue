<template>
  <li
    class="list-inline-item"
    data-bs-toggle="tooltip"
    data-bs-trigger="hover"
    data-bs-placement="top"
    title="delete"
  >
    <BLink
      class="text-danger d-inline-block remove-item-btn"
      @click.prevent="handleDelete(id)"
    >
      <i class="ri-delete-bin-5-fill fs-16"></i>
    </BLink>
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
    handleDelete: {
      type: Function,
      required: true,
    },
  },
};
</script>
