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
        header: 'status',
        cell: ({ row }) => {
          const status = row.original.status;
          const status_label = row.original.status_label;
          return h(
            'span',
            {
              class: `badge badge-label text-bg-${
                status === 0
                  ? 'warning'
                  : status === 1
                  ? 'success'
                  : status === 2
                  ? 'primary'
                  : status === 3
                  ? 'info'
                  : 'danger'
              }`,
            },
            [h('i', { class: 'mdi mdi-circle-medium' }), status_label],
          );
        },
      },
      {
        accessorFn: (row) => new Date(row.created_at).toLocaleString(),
        header: 'Created At',
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
