import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import useUserStore from '@/state/userStore';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (
    to.meta.requireAuth &&
    !userStore.user.isAuthenticated &&
    userStore.user.role !== 0
  ) {
    const toastMessage = 'You must be an admin to access the page';
    next({
      name: 'login',
      query: { message: toastMessage, type: 'error' },
    });
  } else {
    next();
  }
});

export default router;
