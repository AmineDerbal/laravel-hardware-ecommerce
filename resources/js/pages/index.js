const LoginView = () => import('./auth/LoginView.vue');
const HomeView = () => import('./home/HomeView.vue');
const CategoryList = () => import('./category/CategoryList.vue');
const CategoryCreate = () => import('./category/CategoryCreate.vue');
const CategoryEdit = () => import('./category/CategoryEdit.vue');
const ProductList = () => import('./product/ProductList.vue');
const ProductCreate = () => import('./product/ProductCreate.vue');
const ProductShow = () => import('./product/ProductShow.vue');

export {
  LoginView,
  HomeView,
  CategoryList,
  CategoryCreate,
  CategoryEdit,
  ProductList,
  ProductCreate,
  ProductShow,
};
