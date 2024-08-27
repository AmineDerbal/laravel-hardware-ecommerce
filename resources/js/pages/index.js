const LoginView = () => import('./auth/LoginView.vue');
const HomeView = () => import('./frontend/home/HomeView.vue');
const CategoryProductsList = () =>
  import('./frontend/product/CategoryProductsList.vue');
const AdminDashboard = () => import('./backend/dashboard/DashboardView.vue');
const AdminCategoryList = () => import('./backend/category/CategoryList.vue');
const AdminCategoryCreate = () =>
  import('./backend/category/CategoryCreate.vue');
const AdminCategoryEdit = () => import('./backend/category/CategoryEdit.vue');
const AdminProductList = () => import('./backend/product/ProductList.vue');
const AdminProductCreate = () => import('./backend/product/ProductCreate.vue');
const AdminProductShow = () => import('./backend/product/ProductShow.vue');
const AdminProductEdit = () => import('./backend/product/ProductEdit.vue');

export {
  LoginView,
  HomeView,
  CategoryProductsList,
  AdminCategoryList,
  AdminCategoryCreate,
  AdminCategoryEdit,
  AdminProductList,
  AdminProductCreate,
  AdminProductShow,
  AdminProductEdit,
  AdminDashboard,
};
