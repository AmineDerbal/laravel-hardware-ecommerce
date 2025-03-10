// utils
import PaginationUtils from './utils/PaginationUtils.vue';

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
import ProductQuantityControl from './frontend/products/ProductQuantityControl.vue';
import CartItem from './frontend/carts/CartItem.vue';
import LayoutView from './frontend/layouts/LayoutView.vue';
import HomeContent from './frontend/home/HomeContent.vue';
import ProductsGrid from './frontend/products/LatestList.vue';
import CheckOutModal from './frontend/modals/CheckOutModal.vue';

export {
  // utils
  PaginationUtils,

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
  ProductQuantityControl,
  CartItem,
  LayoutView,
  HomeContent,
  ProductsGrid,
  CheckOutModal,
};
