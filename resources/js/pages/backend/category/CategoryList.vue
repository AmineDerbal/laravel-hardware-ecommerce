<template>
  <AdminLayoutView>
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
        <div v-if="!isLoading">
          <BLink
            :to="{ name: 'admin-category-create' }"
            class="btn btn-primary"
            ><i class="ri-add-line align-bottom me-1"></i>Add Category
          </BLink>
        </div>
      </BCol>
      <ConfirmAdminModalAction
        v-model:showModal="showConfirmModal"
        v-model:confirmAction="confirmAction"
      />
      <AdminTable
        :data="categories.data"
        :columns="columns"
        :customGlobalFilter="customGlobalFilter"
        :key="categories"
        v-if="categories"
      />
      <PaginationUtils
        :meta="categories.meta"
        :links="categories.links"
        :onPageChange="onPageChange"
        :key="categories"
        v-if="categories"
      />
    </BRow>
  </AdminLayoutView>
</template>

<script>
import { computed, onBeforeMount, h, onUpdated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import {
  AdminLayoutView,
  LoaderView,
  AdminDeleteButton,
  AdminEditButton,
  AdminTable,
  PaginationUtils,
  ConfirmAdminModalAction,
} from '@/components';
import { useCategoryStore } from '@/state';
import {
  navigateToPage,
  openConfirmModal,
  fetchItems,
} from '@/utils/pagesUtils';

export default {
  components: {
    AdminLayoutView,
    LoaderView,
    AdminDeleteButton,
    AdminEditButton,
    AdminTable,
    PaginationUtils,
    ConfirmAdminModalAction,
  },

  setup() {
    const store = useCategoryStore();
    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const categories = computed(() => store.categories);
    const isLoading = computed(() => store.isLoading);
    const hasError = computed(() => store.hasError);
    const cancelUpdate = ref(false);
    const showConfirmModal = ref(false);
    const confirmAction = ref(null);

    const onPageChange = (page) => navigateToPage(page, router, route);

    const deleteCategory = async (id) => {
      const response = await store.deleteCategory(id);
      if (response.status === 200 || response.status === 201) {
        await fetchItems(store.getCategories, route);
        toast.success(response.data.message, { timeout: 2000 });
      } else {
        toast.error('Failed to delete the category');
      }
    };

    const columns = [
      {
        accessorKey: 'code',
        header: 'Code',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'parent.name',
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
          const editButton = h(AdminEditButton, { id: id, item: 'category' });
          const deleteButton = h(AdminDeleteButton, {
            id: id,
            item: 'category',

            handleDelete: () => {
              openConfirmModal(cancelUpdate, showConfirmModal);
              confirmAction.value = () => deleteCategory(id);
            },
          });
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
      await fetchItems(store.getCategories, route);
    });

    onUpdated(async () => {
      if (cancelUpdate.value) {
        cancelUpdate.value = false;
        return;
      }

      await fetchItems(store.getCategories, route);
    });

    return {
      categories,
      isLoading,
      hasError,
      columns,
      customGlobalFilter,
      onPageChange,
      showConfirmModal,
      confirmAction,
    };
  },
};
</script>
