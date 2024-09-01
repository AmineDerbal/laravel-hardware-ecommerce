import {
  HomeView,
  LoginView,
  CategoryProductsList,
  ProductShow,
  AdminCategoryList,
  AdminCategoryCreate,
  AdminCategoryEdit,
  AdminProductList,
  AdminProductCreate,
  AdminProductShow,
  AdminProductEdit,
  AdminDashboard,
} from '../pages';
import { useUserStore } from '@/state';

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
        beforeEnter: (to, from, next) => {
          const userStore = useUserStore();

          if (userStore.user.isAuthenticated) {
            next({ name: 'home' });
          } else {
            next();
          }
        },
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
