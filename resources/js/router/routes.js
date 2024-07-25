import { HomeView, LoginView, CategoryList, CategoryCreate } from '../pages';

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
    ],
  },
];

export default routes;
