import {
  HomeView,
  LoginView,
  AdminCategoryList,
  AdminCategoryCreate,
  AdminCategoryEdit,
  AdminProductList,
  AdminProductCreate,
  AdminProductShow,
  AdminProductEdit,
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
    children: [
      {
        path: '',
        component: HomeView,
      },
      {
        path: 'category-products/:slug',
        name: 'category-products',
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
        path: 'products',
        meta: {
          requireAuth: true,
        },
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
            path: 'show/:id',
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
        meta: {
          requireAuth: true,
        },

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
    ],
  },
];

export default routes;
