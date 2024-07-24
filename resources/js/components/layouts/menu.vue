<script>
import { HomeIcon, BoxIcon } from '@zhuowenli/vue-feather-icons';

export default {
  components: {
    HomeIcon,
    BoxIcon,
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
          to="/"
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
                to="/products"
                class="nav-link custom-abc"
                data-key="products"
                >All Products</router-link
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
                to="/categories"
                class="nav-link custom-abc"
                data-key="categories"
                >All Categories</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                to="/categories/new"
                class="nav-link custom-abc"
                data-key="categories"
                >Add Category</router-link
              >
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </BContainer>
</template>
