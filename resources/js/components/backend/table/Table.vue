<script>
import { ref, computed } from 'vue';
import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/vue-table';

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    meta: {
      type: Object,
      required: true,
    },
    links: {
      type: Object,
      required: true,
    },
    onPageChange: {
      type: Function,
      required: true,
    },

    customGlobalFilter: {
      type: Function,
      required: false,
    },
  },
  components: {
    FlexRender,
  },
  setup(props) {
    const sorting = ref([]);
    const filter = ref('');
    const currentPage = ref(props.meta.current_page || 1);

    const table = useVueTable({
      data: props.data,
      columns: props.columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        get sorting() {
          return sorting.value;
        },
        get globalFilter() {
          return filter.value;
        },
      },

      onSortingChange: (updaterOrValue) => {
        sorting.value =
          typeof updaterOrValue === 'function'
            ? updaterOrValue(sorting.value)
            : updaterOrValue;
      },

      // Conditionally set globalFilterFn only if customGlobalFilter is provided
      ...(props.customGlobalFilter
        ? { globalFilterFn: props.customGlobalFilter }
        : {}),
    });

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
      table,
      paginationRange,
      currentPage,
      filter,
    };
  },
};
</script>

<template>
  <BCol
    xxl="5"
    sm="6"
  >
    <div class="search-box">
      <input
        type="text"
        class="form-control search"
        v-model="filter"
        placeholder="Search..."
        :disabled="isLoading"
      />
      <i class="ri-search-line search-icon"></i>
    </div>
  </BCol>
  <BCol
    lg="12"
    class="mb-2 mt-4"
  >
    <div class="table-responsive table-card mb-2">
      <table
        class="table table-nowrap align-middle"
        id="orderTable"
      >
        <thead class="text-muted table-light">
          <tr
            class="text-uppercase"
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :class="{
                'cursor-pointer select-none': header.column.getCanSort(),
              }"
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
              {{ { asc: ' ↑', desc: '↓' }[header.column.getIsSorted()] }}
            </th>
          </tr>
        </thead>
        <tbody class="list form-check-all">
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BCol>
  <div class="d-flex justify-content-end">
    <div class="pagination-wrap hstack gap-2">
      <p class="mb-0">
        Page {{ currentPage }} of {{ meta.last_page }} -
        {{ table.getFilteredRowModel().rows.length }} results
      </p>
      <BLink
        class="page-item pagination-prev"
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
          >
            {{ page }}
          </BLink>
        </li>
      </ul>
      <BLink
        class="page-item pagination-next"
        href="#"
        :disabled="!links.next"
        @click="onPageChange(links.next)"
      >
        Next
      </BLink>
    </div>
  </div>
</template>
