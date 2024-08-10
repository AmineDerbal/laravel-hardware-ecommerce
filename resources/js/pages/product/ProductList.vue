<template>
  <LayoutView>
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
            :to="{ name: 'product-create' }"
            class="btn btn-primary"
            ><i class="ri-add-line align-bottom me-1"></i>Add Product
          </BLink>
        </div>
      </BCol>
      <Table
        :data="products"
        :columns="columns"
        :customGlobalFilter="customGlobalFilter"
        :key="products"
        v-if="products.length > 0 && !isLoading && !hasError"
      />
    </BRow>
  </LayoutView>
</template>

<script>
import { onBeforeMount, computed, h } from 'vue';
import { useToast } from 'vue-toastification';
import { useProductStore } from '@/state';
import {
  LayoutView,
  LoaderView,
  DeleteButton,
  EditButton,
  Table,
} from '@/components';
import ShowButton from '@/components/Buttons/ShowButton.vue';

export default {
  components: {
    LayoutView,
    LoaderView,
    DeleteButton,
    EditButton,
    ShowButton,
    Table,
  },

  setup() {
    const store = useProductStore();
    const toast = useToast();
    const products = computed(() => store.products);
    const isLoading = computed(() => store.isLoading);
    const hasError = computed(() => store.hasError);

    const getProducts = async () => {
      await store.getProducts();
    };

    const handleDelete = async (id) => {
      const response = await store.deleteProduct(id);
      if (response.status === 200 || response.status === 201) {
        await getProducts();
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
          const showButton = h(ShowButton, { id: id, item: 'product' });
          const editButton = h(EditButton, { id: id, item: 'product' });
          const deleteButton = h(DeleteButton, {
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
      await getProducts();
    });

    return {
      products,
      columns,
      isLoading,
      hasError,
      customGlobalFilter,
    };
  },
};
</script>
