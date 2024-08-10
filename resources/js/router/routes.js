import {
  HomeView,
  LoginView,
  CategoryList,
  CategoryCreate,
  CategoryEdit,
  ProductList,
  ProductCreate,
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
    path: '/products',
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: '',
        name: 'product-list',
        component: ProductList,
      },
      {
        path: 'create',
        name: 'product-create',
        component: ProductCreate,
      },
      {
        path: 'show/:id',
        name: 'product-show',
      },
      {
        path: 'edit/:id',
        name: 'product-edit',
      },
    ],
  },
  {
    path: '/categories',
    meta: {
      requireAuth: true,
    },

    children: [
      {
        path: '',
        name: 'category-list',
        component: CategoryList,
      },
      {
        path: 'create',
        name: 'category-create',
        component: CategoryCreate,
      },
      {
        path: 'edit/:id',
        name: 'category-edit',
        component: CategoryEdit,
      },
    ],
  },
];

export default routes;
