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
        :links="products.links"
        :meta="products.meta"
        :onPageChange="onPageChange"
        :key="products"
        v-if="products.data.length > 0 && !isLoading && !hasError"
      />
    </BRow>
  </AdminLayoutView>
</template>

<script>
import { onBeforeMount, computed, h } from 'vue';
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
} from '@/components';

export default {
  components: {
    AdminLayoutView,
    LoaderView,
    AdminDeleteButton,
    AdminEditButton,
    AdminShowButton,
    AdminTable,
  },

  setup() {
    const store = useProductStore();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const products = computed(() => store.products);
    const isLoading = computed(() => store.isLoading);
    const hasError = computed(() => store.hasError);
    const page = route.query.page || 1;

    const onPageChange = (page) => {
      router
        .push({ name: 'admin-product-list', query: { page: page } })
        .then(() => {
          window.location.reload();
        });
    };
    const getProducts = async (page) => {
      await store.getProducts(page);
    };

    const handleDelete = async (id) => {
      const response = await store.deleteProduct(id);
      if (response.status === 200 || response.status === 201) {
        await getProducts(page);
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
        header: 'image',
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
          return h('span', {}, `${price} $`);
        },
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
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
            handleDelete,
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
      await getProducts(page);
    });

    return {
      products,
      columns,
      isLoading,
      hasError,
      customGlobalFilter,
      onPageChange,
    };
  },
};
</script>
