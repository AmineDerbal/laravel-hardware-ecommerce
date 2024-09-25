<template>
  <AdminLayoutView>
    <LoaderView v-if="isLoading" />

    <div v-else-if="hasError">
      <h1>An Error has occurred</h1>
    </div>
    <BRow
      class="gy-2 mb-2"
      id="users-list"
      v-else
    >
      <BCol sm="auto">
        <div v-if="!isLoading">
          <BLink class="btn btn-primary"
            ><i class="ri-add-line align-bottom me-1"></i>Add User
          </BLink>
        </div>
      </BCol>
      <AdminTable
        :data="users.data"
        :columns="columns"
        :key="users"
        v-if="users"
      />
      <PaginationUtils
        :meta="users.meta"
        :links="users.links"
        :onPageChange="onPageChange"
        :key="users"
        v-if="users"
      />
    </BRow>
  </AdminLayoutView>
</template>

<script>
import { onBeforeMount, computed, h, onUpdated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useUserStore } from '@/state';
import {
  AdminLayoutView,
  LoaderView,
  AdminTable,
  AdminDeleteButton,
  AdminEditButton,
  AdminShowButton,
  PaginationUtils,
} from '@/components';

export default {
  components: {
    AdminLayoutView,
    LoaderView,
    AdminTable,
    AdminDeleteButton,
    AdminEditButton,
    AdminShowButton,
    PaginationUtils,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const userStore = useUserStore();
    const isLoading = computed(() => userStore.isLoading);
    const hasError = computed(() => userStore.hasError);
    const users = computed(() => userStore.users);

    const getPage = () => route.query.page || 1;

    // check is the authenticated user id is the same as the user id in the url
    const isCurrentUser = (id) => {
      return id === userStore.user.id;
    };
    const onPageChange = (page) => {
      router.push({ name: 'admin-user-list', query: { page: page } });
    };

    const toggleUserActiveStatus = async (e, id) => {
      e.preventDefault();

      if (isCurrentUser(id)) {
        toast.error('You can not toggle your own status');
        return;
      }
      const response = await userStore.toggleUserAciveStatus(id);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        await getProducts(getPage());
      } else {
        toast.error(response.data.message);
      }
    };

    const getProducts = async (page) => {
      await userStore.getUsers(page);
    };

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
        accessorKey: 'email',
        header: 'Email',
      },
      {
        Header: 'Role',
        accessorKey: 'role',
        cell: ({ row }) => {
          const role = row.original.role;

          return h(
            'span',
            {
              class: `badge badge-label text-bg-${
                role === 0 ? 'primary' : 'success'
              }`,
            },
            [
              h('i', { class: 'mdi mdi-circle-medium' }),
              role === 0 ? 'Admin' : 'User',
            ],
          );
        },
      },
      {
        Header: 'Active',
        accessorKey: 'is_active',
        cell: ({ row }) => {
          const active = row.original.is_active;
          const id = row.original.id;
          return h(
            'div',
            { class: 'form-check form-switch d-flex align-items-center gap-2' },
            [
              h('input', {
                class: 'form-check-input',
                type: 'checkbox',
                role: 'switch',
                name: 'flexSwitchCheckDefault',
                checked: active === 1,
                onClick: (e) => {
                  toggleUserActiveStatus(e, id);
                },
              }),
              h(
                'label',
                {
                  class: [
                    'form-check-label',
                    active === 1 ? 'text-primary' : 'text-danger',
                  ],
                  for: 'flexSwitchCheckDefault',
                },
                active === 1 ? 'Active' : 'Inactive',
              ),
            ],
          );
        },
      },
    ];

    onBeforeMount(async () => {
      await getProducts(getPage());
    });

    onUpdated(async () => {
      await getProducts(getPage());
    });

    return {
      columns,
      users,
      isLoading,
      hasError,
      onPageChange,
      toggleUserActiveStatus,
    };
  },
};
</script>
