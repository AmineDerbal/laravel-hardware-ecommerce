// backend
import AdminLayoutView from './backend/layouts/LayoutView.vue';
import LoaderView from './LoaderView.vue';
import AdminDeleteButton from './backend/Buttons/DeleteButton.vue';
import AdminEditButton from './backend/Buttons/EditButton.vue';
import AdminShowButton from './backend/Buttons/ShowButton.vue';
import AdminTable from './backend/table/Table.vue';
import AdminCategoryForm from './backend/category/CategoryForm.vue';
import AdminProductForm from './backend/product/ProductForm.vue';
import ConfirmAdminModalAction from './backend/modals/ConfirmActionModal.vue';

// frontend
import LayoutView from './frontend/layouts/LayoutView.vue';
import HomeContent from './frontend/home/HomeContent.vue';
import ProductsGrid from './frontend/products/LatestList.vue';

// utils
import PaginationUtils from './utils/PaginationUtils.vue';

export {
  // backend
  AdminLayoutView,
  LoaderView,
  AdminDeleteButton,
  AdminEditButton,
  AdminShowButton,
  AdminTable,
  AdminCategoryForm,
  AdminProductForm,
  ConfirmAdminModalAction,

  // frontend
  LayoutView,
  HomeContent,
  ProductsGrid,

  // utils
  PaginationUtils,
};
