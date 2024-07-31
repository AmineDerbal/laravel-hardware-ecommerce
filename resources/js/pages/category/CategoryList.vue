<script>
import { computed, onBeforeMount, ref, h, watch } from 'vue';
import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/vue-table';
import { LayoutView, LoaderView, DeleteButton, EditButton } from '@/components';
import { useCategoryStore } from '@/state';

export default {
  components: {
    LayoutView,
    LoaderView,
    DeleteButton,
    EditButton,
    FlexRender,
  },

  setup() {
    const store = useCategoryStore();
    const categories = ref([]);
    const isLoading = computed(() => store.isLoading);
    const hasError = computed(() => store.hasError);
    const sorting = ref([]);
    const filter = ref('');
    const table = ref(null);
    // Define columns with custom cell renderers
    const columns = [
      {
        accessorKey: 'id',
        header: 'ID',
        enableSorting: false,
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'parent',
        header: 'Parent Category',
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const { id } = row.original;
          const editButton = h(EditButton, { id: id, item: 'category' });
          const deleteButton = h(DeleteButton, { id: id, item: 'category' });
          return h('ul', { class: 'list-inline hstack gap-2 mb-0' }, [
            editButton,
            deleteButton,
          ]);
        },
        enableSorting: false,
      },
    ];

    const initalizeTable = (data) => {
      console.log(data);
      table.value = useVueTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
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
      });
      console.log(table.value.getRowModel());
    };

    watch(
      categories,
      (newCategories) => {
        initalizeTable(newCategories);
      },
      { immediate: true },
    );

    // Fetch categories on mount
    onBeforeMount(async () => {
      const response = await store.getCategories();

      if (response.status === 200 || response.status === 201) {
        categories.value = response.data;
      }
    });

    return { categories, isLoading, hasError, columns, table }; // Make sure to return columns
  },
};
</script>

<template>
  <LayoutView>
    <LoaderView v-if="isLoading" />
    <div v-if="hasError">
      <h1>An Error has occurred</h1>
    </div>
    <BRow
      class="gy-2 mb-2"
      id="category-list"
      v-else
    >
      <BCol lg="12">
        <div class="table-responsive table-card mb-1">
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
    </BRow>
  </LayoutView>
</template>
