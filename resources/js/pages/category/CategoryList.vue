<script>
import { computed, onBeforeMount, ref, h } from 'vue';

import {
  LayoutView,
  LoaderView,
  DeleteButton,
  EditButton,
  Table,
} from '@/components';
import { useCategoryStore } from '@/state';

export default {
  components: {
    LayoutView,
    LoaderView,
    DeleteButton,
    EditButton,
    Table,
  },

  setup() {
    const store = useCategoryStore();
    const categories = ref([]);
    const isLoading = computed(() => store.isLoading);
    const hasError = computed(() => store.hasError);

    const columns = [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'parent',
        header: 'Parent Category',
        cell: ({ row }) => {
          const parent = row.original.parent;
          const value = parent ? parent.name : 'NULL';
          return value;
        },
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
    // Create a custom global filter
    const customGlobalFilter = (row, columnId, filterValue) => {
      const originalRow = row.original;
      const cellValue = row.getValue(columnId)?.toString().toLowerCase() || '';
      const parentName = originalRow.parent?.name?.toLowerCase() || 'null';

      return (
        cellValue.includes(filterValue.toLowerCase()) ||
        parentName.includes(filterValue.toLowerCase())
      );
    };

    // Fetch categories on mount
    onBeforeMount(async () => {
      const response = await store.getCategories();

      if (response.status === 200 || response.status === 201) {
        categories.value = response.data;
      }
    });

    return {
      categories,
      isLoading,
      hasError,
      columns,
      customGlobalFilter,
    };
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
      <BCol sm="auto">
        <div>
          <BLink
            href="/categories/create"
            class="btn btn-primary"
            ><i class="ri-add-line align-bottom me-1"></i>Add Category
          </BLink>
        </div>
      </BCol>
      <Table
        :data="categories"
        :columns="columns"
        :customGlobalFilter="customGlobalFilter"
        v-if="categories.length > 0"
      />
    </BRow>
  </LayoutView>
</template>
