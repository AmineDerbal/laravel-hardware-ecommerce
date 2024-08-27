<template>
  <div class="d-flex justify-content-end">
    <div class="pagination-wrap hstack gap-2">
      <BLink
        class="page-item pagination-prev"
        :class="{ 'whb-red-text': isRed }"
        href="#"
        :disabled="!links.prev"
        @click="onPageChange(links.prev)"
      >
        Previous
      </BLink>

      <ul class="pagination listjs-pagination mb-0">
        <li
          v-for="page in paginationRange"
          :key="page"
          :class="[
            'page-item',
            { active: page === currentPage, disabled: page === '...' },
          ]"
        >
          <BLink
            class="page-link"
            href="#"
            @click.prevent="onPageChange(page)"
            :class="{
              'whb-red-bg ': isRed && page === currentPage,
              'whb-red-text ': isRed && page !== currentPage,
            }"
          >
            {{ page }}
          </BLink>
        </li>
      </ul>
      <BLink
        class="page-item pagination-next"
        :class="{ 'whb-red-text': isRed }"
        href="#"
        :disabled="!links.next"
        @click="onPageChange(links.next)"
      >
        Next
      </BLink>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
export default {
  props: {
    meta: {
      type: Object,
      required: true,
    },
    links: {
      type: Object,
      required: false,
    },
    onPageChange: {
      type: Function,
      required: false,
    },
    isRed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const currentPage = ref(props.meta.current_page || 1);

    const paginationRange = computed(() => {
      const totalPages = props.meta?.last_page || 1;
      const visiblePages = 5;
      const half = Math.floor(visiblePages / 2);
      if (totalPages <= visiblePages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
      let start = Math.max(currentPage.value - half, 1);
      let end = Math.min(start + visiblePages - 1, totalPages);
      if (end - start < visiblePages - 1) {
        start = Math.max(end - visiblePages + 1, 1);
      }
      const range = Array.from(
        { length: end - start + 1 },
        (_, i) => start + 1,
      );
      if (start > 1) range.unshift('...');
      if (end < totalPages) range.push('...');
      return range;
    });
    return {
      paginationRange,
      currentPage,
    };
  },
};
</script>

<style scoped>
.whb-red-bg {
  background-color: var(--whb-red-bg);
  border-color: var(--whb-red-bg);
}
.whb-red-text {
  color: var(--whb-red-bg);
}
</style>
