import {
  HomeView,
  LoginView,
  CategoryList,
  CategoryCreate,
  CategoryEdit,
  ProductList,
  ProductCreate,
  ProductShow,
  ProductEdit,
  AdminDashboard,
} from '../pages';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },

  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requireAuth: true,
    },
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
        path: 'products',
        meta: {
          requireAuth: true,
        },
        children: [
          {
            path: '',
            name: 'admin-product-list',
            component: ProductList,
          },
          {
            path: 'create',
            name: 'admin-product-create',
            component: ProductCreate,
          },
          {
            path: 'show/:id',
            name: 'admin-product-show',
            component: ProductShow,
          },
          {
            path: 'edit/:id',
            name: 'admin-product-edit',
            component: ProductEdit,
          },
        ],
      },
      {
        path: 'categories',
        meta: {
          requireAuth: true,
        },

        children: [
          {
            path: '',
            name: 'admin-category-list',
            component: CategoryList,
          },
          {
            path: 'create',
            name: 'admin-category-create',
            component: CategoryCreate,
          },
          {
            path: 'edit/:id',
            name: 'admin-category-edit',
            component: CategoryEdit,
          },
        ],
      },
    ],
  },
];

export default routes;
