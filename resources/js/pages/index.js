const LoginView = () => import('./auth/LoginView.vue');
const HomeView = () => import('./home/HomeView.vue');
const AdminDashboard = () => import('./backend/dashboard/DashboardView.vue');
const CategoryList = () => import('./backend/category/CategoryList.vue');
const CategoryCreate = () => import('./backend/category/CategoryCreate.vue');
const CategoryEdit = () => import('./backend/category/CategoryEdit.vue');
const ProductList = () => import('./backend/product/ProductList.vue');
const ProductCreate = () => import('./backend/product/ProductCreate.vue');
const ProductShow = () => import('./backend/product/ProductShow.vue');
const ProductEdit = () => import('./backend/product/ProductEdit.vue');

export {
  LoginView,
  HomeView,
  CategoryList,
  CategoryCreate,
  CategoryEdit,
  ProductList,
  ProductCreate,
  ProductShow,
  ProductEdit,
  AdminDashboard,
};
