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
      <AdminTable
        :data="orders.data"
        :columns="columns"
        :key="orders"
        v-if="orders"
      />
      <PaginationUtils
        :meta="orders.meta"
        :links="orders.links"
        :onPageChange="onPageChange"
        :key="orders"
        v-if="orders"
      />
    </BRow>
  </AdminLayoutView>
</template>

<script>
import { onBeforeMount, computed, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore } from '@/state';
import {
  AdminLayoutView,
  LoaderView,
  AdminTable,
  PaginationUtils,
} from '@/components';

import { navigateToPage, getPage, fetchItems } from '@/utils/pagesUtils';

export default {
  components: { AdminLayoutView, LoaderView, AdminTable, PaginationUtils },
  setup() {
    const orderStore = useOrderStore();
    const route = useRoute();
    const router = useRouter();
    const orders = computed(() => orderStore.orders);
    const isLoading = computed(() => orderStore.isLoading);
    const hasError = computed(() => orderStore.hasError);

    const onPageChange = (page) => navigateToPage(page, router, routeName);

    const columns = [
      {
        accessorKey: 'code',
        header: 'Code',
      },
      {
        accessorKey: 'user.name',
        header: 'Name',
      },
      {
        accessorFn: (row) => `$ ${row.total_amount}`,
        header: 'Total Price',
      },
      {
        accessorKey: 'status',
        header: 'status',
        cell: ({ row }) => {
          const status = row.original.status;
          return h(
            'span',
            {
              class: `badge badge-label text-bg-${
                status === 'processing'
                  ? 'warning'
                  : status === 'shipped'
                  ? 'success'
                  : status === 'delivered'
                  ? 'primary'
                  : status === 'completed'
                  ? 'info'
                  : 'danger'
              }`,
            },
            [h('i', { class: 'mdi mdi-circle-medium' }), status],
          );
        },
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: ({ row }) => {
          const createdAt = row.original.created_at;
          return new Date(createdAt).toLocaleString();
        },
      },
    ];

    onBeforeMount(async () => {
      await fetchItems(orderStore.getOrders, getPage(route));
      console.log('orders', orders.value);
    });
    return {
      orders,
      isLoading,
      hasError,
      columns,
      onPageChange,
    };
  },
};
</script>
