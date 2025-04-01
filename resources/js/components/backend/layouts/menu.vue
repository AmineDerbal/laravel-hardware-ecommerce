<script>
import {
  HomeIcon,
  BoxIcon,
  UserIcon,
  ShoppingBagIcon,
} from '@zhuowenli/vue-feather-icons';

export default {
  components: {
    HomeIcon,
    BoxIcon,
    UserIcon,
    ShoppingBagIcon,
  },

  data() {
    return {
      settings: {
        minScrollbarLength: 60,
      },
    };
  },
};
</script>

<template>
  <BContainer fluid>
    <ul
      class="navbar-nav h-100"
      id="navbar-nav"
    >
      <li class="menu-title">
        <span data-key="t-menu">Menu</span>
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'admin' }"
          class="nav-link menu-link"
        >
          <HomeIcon
            width="24"
            height="24"
          />
          <span data-key="Tableau de bord">Dashboard</span>
        </router-link>
      </li>
      <li class="nav-item">
        <a
          class="nav-link menu-link"
          href="#sidebarUsers"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="sidebarUsers"
        >
          <UserIcon
            width="24"
            height="24"
          />
          <span data-key="user">Users</span>
        </a>
        <div
          class="collapse menu-dropdown"
          id="sidebarUsers"
        >
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link
                :to="{ name: 'admin-user-list' }"
                class="nav-link custom-abc"
                data-key="users"
                >All Users</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'admin-user-create' }"
                class="nav-link custom-abc"
                data-key="users"
                >Add User</router-link
              >
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a
          class="nav-link menu-link"
          href="#sidebarProducts"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="sidebarProducts"
        >
          <BoxIcon
            width="24"
            height="24"
          />
          <span data-key="product">Products</span>
        </a>
        <div
          class="collapse menu-dropdown"
          id="sidebarProducts"
        >
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link
                :to="{ name: 'admin-product-list' }"
                class="nav-link custom-abc"
                data-key="products"
                >All Products</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'admin-product-create' }"
                class="nav-link custom-abc"
                data-key="products"
                >Add Product</router-link
              >
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a
          class="nav-link menu-link"
          href="#sidebarCategories"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="sidebarCategories"
        >
          <i class="ri-apps-line"></i>
          <span data-key="category">Categories</span>
        </a>
        <div
          class="collapse menu-dropdown"
          id="sidebarCategories"
        >
          <ul class="nav nav-sm flex-column">
            <li class="nav-item">
              <router-link
                :to="{ name: 'admin-category-list' }"
                class="nav-link custom-abc"
                data-key="categories"
                >All Categories</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'admin-category-create' }"
                class="nav-link custom-abc"
                data-key="categories"
                >Add Category</router-link
              >
            </li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a
          class="nav-link menu-link"
          href="#sidebarOrders"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="sidebarOrders"
        >
          <ShoppingBagIcon
            width="24"
            height="24"
          ></ShoppingBagIcon>
          <span data-key="category">Orders</span>
        </a>
        <div
          class="collapse menu-dropdown"
          id="sidebarOrders"
        >
          <ul class="nav nav-sm flex-column"></ul>
        </div>
      </li>
    </ul>
  </BContainer>
</template>
