<template>
  <header>
    <div class="top-bar whb-top-bar py-2 d-none d-lg-block">
      <div class="container d-flex justify-content-between align-items-center">
        <div class="description text-white fw-bold">
          <p class="mb-0">
            Sale of Hardware, Furniture & Computer Accessories Network
          </p>
        </div>
        <div class="social-links text-white d-flex gap-1">
          <a href="#"><i class="ri-facebook-fill text-white fs-24"></i></a>
          <a href="#"><i class="ri-twitter-fill text-white fs-24"></i></a>
          <a href="#"><i class="ri-instagram-fill text-white fs-24"></i></a>
          <a href="#"><i class="ri-whatsapp-fill text-white fs-24"></i></a>
        </div>
      </div>
    </div>
    <div class="midlle-bar py-3">
      <div
        class="container d-none d-lg-flex justify-content-between align-items-center gap-2"
      >
        <div class="logo">
          <router-link to="/">
            <img
              src="@/assets/images/logo.png"
              alt="logo"
              height="80"
            />
          </router-link>
        </div>
        <div class="search-bar w-50">
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
          />
        </div>
        <div class="user-info">
          <div class="d-flex align-items-center gap-2">
            <i class="ri-user-line fs-24"></i>
            <div class="position-relative">
              <i class="ri-clipboard-line fs-24"></i>
              <span
                class="badge badge-danger position-absolute top-0 start-100 whb-top-bar translate-middle badge-rounded lh-1"
              >
                0
                <!-- Replace this with your cart count variable -->
              </span>
            </div>
            <span class="ml-2">Hello, User!</span>
          </div>
        </div>
      </div>
      <div
        class="d-flex d-lg-none align-items-center justify-content-between mx-2"
      >
        <div
          class="menu position-relative"
          @click="setShowMenu"
        >
          <i class="ri-menu-line fs-24"></i>
        </div>
        <div class="logo">
          <router-link to="/">
            <img
              src="@/assets/images/logo.png"
              alt="logo"
              height="50"
            />
          </router-link>
        </div>
        <div class="user-info">
          <div class="d-flex align-items-center gap-2">
            <div class="position-relative mx-2">
              <i class="ri-clipboard-line fs-24"></i>
              <span
                class="badge badge-danger position-absolute top-0 start-100 whb-top-bar translate-middle badge-rounded lh-1"
              >
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="search-bar my-2 mx-3 wv-100">
      <input
        type="text"
        class="form-control"
        placeholder="Search..."
      />
    </div>
    <Navbar
      :items="items"
      :key="items"
    />
    <MobileMenu
      v-if="showMenu"
      :items="items"
      :key="showMenu"
    />
  </header>
</template>
<script>
import { computed, onBeforeMount } from 'vue';
import { useLayoutStore, useCategoryStore } from '@/state';
import Navbar from './NavbarView.vue';
import MobileMenu from './MobileMenu.vue';

export default {
  components: { Navbar, MobileMenu },

  setup() {
    const layoutStore = useLayoutStore();
    const categoryStore = useCategoryStore();
    const items = computed(() => categoryStore.headerCategories);
    const showMenu = computed(() => layoutStore.layout.showMenu);

    const getHeaderCategories = async () => {
      await categoryStore.getHeaderCategories();
    };

    onBeforeMount(async () => {
      await getHeaderCategories();
    });
    const setShowMenu = () => {
      layoutStore.setShowMenu(!showMenu.value);
    };

    return { setShowMenu, showMenu, items };
  },
};
</script>
<style scoped>
.badge-rounded {
  border-radius: 50%;
}
.menu {
  cursor: pointer;
}
</style>
