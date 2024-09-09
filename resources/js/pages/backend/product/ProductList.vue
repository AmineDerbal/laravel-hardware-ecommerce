<template>
  <AdminLayoutView>
    <LoaderView v-if="isLoading" />
    <div v-if="hasError">
      <h1>An Error has occurred</h1>
    </div>
    <BRow
      class="gy-2 mb-2"
      id="products-list"
      v-else
    >
      <BCol sm="auto">
        <div v-if="!isLoading">
          <BLink
            :to="{ name: 'admin-product-create' }"
            class="btn btn-primary"
            ><i class="ri-add-line align-bottom me-1"></i>Add Product
          </BLink>
        </div>
      </BCol>
      <AdminTable
        :data="products.data"
        :columns="columns"
        :customGlobalFilter="customGlobalFilter"
        :key="products"
        v-if="products"
      />
    </BRow>
    <PaginationUtils
      :meta="products.meta"
      :links="products.links"
      :onPageChange="onPageChange"
      :key="products"
      v-if="products"
    />
    <ConfirmAdminModalAction
      v-model:showModal="showConfirmModal"
      v-model:confirmAction="confirmAction"
    />
  </AdminLayoutView>
</template>

<script>
import { onBeforeMount, computed, h, onUpdated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useProductStore } from '@/state';
import {
  AdminLayoutView,
  LoaderView,
  AdminDeleteButton,
  AdminEditButton,
  AdminShowButton,
  AdminTable,
  PaginationUtils,
  ConfirmAdminModalAction,
} from '@/components';

import {
  navigateToPage,
  getPage,
  fetchItems,
  openConfirmModal,
} from '@/utils/pagesUtils';

export default {
  components: {
    AdminLayoutView,
    LoaderView,
    AdminDeleteButton,
    AdminEditButton,
    AdminShowButton,
    AdminTable,
    PaginationUtils,
    ConfirmAdminModalAction,
  },

  setup() {
    const store = useProductStore();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const products = computed(() => store.products);
    const isLoading = computed(() => store.isLoading);
    const hasError = computed(() => store.hasError);
    const cancelUpdate = ref(false);
    const showConfirmModal = ref(false);
    const confirmAction = ref(() => {});
    const routeName = route.name;

    const onPageChange = (page) => navigateToPage(page, router, routeName);

    const deleteItem = async (id) => {
      const response = await store.deleteProduct(id);
      if (response.status === 200 || response.status === 201) {
        await fetchItems(store.getProducts, getPage(route));
        toast.success(response.data.message, { timeout: 2000 });
      } else {
        toast.error('Failed to delete the product');
      }
    };

    const columns = [
      {
        accessorKey: 'code',
        header: 'Code',
      },
      {
        header: 'Image',
        cell: ({ row }) => {
          const image = row.original.image_url;
          return h('img', {
            src: image,
            style: 'width: 75px; height: 75px; ',
            class: 'object-fit-cover rounded',
          });
        },
        enableSorting: false,
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => {
          const category = row.original.category;
          const value = category ? category.name : 'N/A';
          return value;
        },
      },
      {
        header: 'Price',
        cell: ({ row }) => {
          const { price } = row.original;
          return h('span', {}, `$ ${price}`);
        },
      },
      {
        header: 'Stock',
        cell: ({ row }) => {
          const { stock } = row.original;
          const value = stock < 2 ? 'Unit' : 'Units';
          return h('span', {}, `${stock} ${value}`);
        },
      },
      {
        header: 'Action',
        enableSorting: false,
        cell: ({ row }) => {
          const { id } = row.original;
          const showButton = h(AdminShowButton, { id: id, item: 'product' });
          const editButton = h(AdminEditButton, { id: id, item: 'product' });
          const deleteButton = h(AdminDeleteButton, {
            id: id,
            item: 'product',
            handleDelete: () => {
              openConfirmModal(cancelUpdate, showConfirmModal);
              confirmAction.value = () => deleteItem(id);
            },
          });
          return h('ul', { class: 'list-inline hstack gap-2 mb-0' }, [
            showButton,
            editButton,
            deleteButton,
          ]);
        },
      },
    ];

    const customGlobalFilter = (row, columnId, filterValue) => {
      const originalRow = row.original;
      const cellValue = row.getValue(columnId)?.toString().toLowerCase() || '';
      const categoryName = originalRow.category?.name?.toLowerCase() || 'null';

      return (
        cellValue.includes(filterValue.toLowerCase()) ||
        categoryName.includes(filterValue.toLowerCase())
      );
    };

    onBeforeMount(async () => {
      //await getProducts(getPage());
      await fetchItems(store.getProducts, getPage(route));
    });

    onUpdated(async () => {
      if (cancelUpdate.value) {
        cancelUpdate.value = false;
        return;
      }
      await fetchItems(store.getProducts, getPage(route));
    });

    return {
      products,
      columns,
      isLoading,
      hasError,
      customGlobalFilter,
      onPageChange,
      showConfirmModal,
      confirmAction,
    };
  },
};
</script>
