import {
  HomeView,
  LoginView,
  RegisterView,
  CategoryProductsList,
  ProductShow,
  UserCart,
  AdminUserList,
  AdminCategoryList,
  AdminCategoryCreate,
  AdminCategoryEdit,
  AdminProductList,
  AdminProductCreate,
  AdminProductShow,
  AdminProductEdit,
  AdminDashboard,
  AdminOrdersList,
  AdminOrderShow,
} from '../pages';
import { useUserStore } from '@/state';
import {
  redirectIfAuthenticated,
  allowIfAuthenticated,
} from '@/utils/authUtils';

const checkIfAuth = (to, from, next) => {
  const userStore = useUserStore();

  redirectIfAuthenticated(userStore.user, to, from, next);
};

const allowIfIsAuthenticated = (to, from, next) => {
  const userStore = useUserStore();

  allowIfAuthenticated(userStore.user, to, from, next);
};

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'homeView' },
    children: [
      {
        path: '',
        name: 'homeView',
        component: HomeView,
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView,
        beforeEnter: checkIfAuth,
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView,
        beforeEnter: checkIfAuth,
      },
      {
        path: 'category-products/:slug',
        name: 'category-products',
        component: CategoryProductsList,
      },
      {
        path: 'products/:slug',
        name: 'product-show',
        component: ProductShow,
      },
      {
        path: 'my-cart',
        name: 'my-cart',
        component: UserCart,
        beforeEnter: allowIfIsAuthenticated,
      },
    ],
  },

  {
    path: '/admin',
    name: 'admin',
    redirect: { name: 'admin-dashboard' },
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: AdminDashboard,
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            name: 'admin-user-list',
            component: AdminUserList,
          },
          {
            path: 'create',
            name: 'admin-user-create',
          },
        ],
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            name: 'admin-product-list',
            component: AdminProductList,
          },
          {
            path: 'create',
            name: 'admin-product-create',
            component: AdminProductCreate,
          },
          {
            path: ':id',
            name: 'admin-product-show',
            component: AdminProductShow,
          },
          {
            path: 'edit/:id',
            name: 'admin-product-edit',
            component: AdminProductEdit,
          },
        ],
      },
      {
        path: 'categories',

        children: [
          {
            path: '',
            name: 'admin-category-list',
            component: AdminCategoryList,
          },
          {
            path: 'create',
            name: 'admin-category-create',
            component: AdminCategoryCreate,
          },
          {
            path: 'edit/:id',
            name: 'admin-category-edit',
            component: AdminCategoryEdit,
          },
        ],
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            name: 'admin-order-list',
            component: AdminOrdersList,
          },
          {
            path: ':id',
            name: 'admin-order-show',
            component: AdminOrderShow,
          },
        ],
      },
    ],
  },
];

export default routes;
