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

    return {
      table,
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
</template>
