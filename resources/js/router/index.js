import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import useUserStore from '@/state/userStore';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requireAuth && !userStore.user.isAuthenticated) {
    next({
      name: 'login',
    });
  } else {
    next();
  }
});

export default router;
