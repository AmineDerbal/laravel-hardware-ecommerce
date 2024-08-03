import {
  HomeView,
  LoginView,
  CategoryList,
  CategoryCreate,
  CategoryEdit,
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
