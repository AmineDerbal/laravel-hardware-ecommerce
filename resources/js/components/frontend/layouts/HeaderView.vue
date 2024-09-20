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
            <div
              class="position-relative cursor-pointer dropdown"
              aria-expanded="false"
              v-if="isAuthenticated"
            >
              <i
                class="ri-user-line fs-24 dropdown-toggle"
                aria-expanded="false"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
              ></i>

              <ul
                class="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
              >
                <li
                  class="dropdown-item"
                  @click="logout"
                >
                  Logout
                </li>
              </ul>
            </div>
            <i
              class="ri-user-line fs-24 cursor-pointer"
              @click="setShowLoginModal(true)"
              v-else
            ></i>
            <div
              class="position-relative cursor-pointer"
              @click="setShowCartModal(true)"
              :key="cartItems"
            >
              <i class="ri-clipboard-line fs-24"></i>
              <span
                class="badge badge-danger position-absolute top-0 start-100 whb-top-bar translate-middle badge-rounded lh-1"
              >
                {{ cartItems.length || 0 }}
              </span>
            </div>
            <span class="ml-2">$ {{ calculateCartTotalPrice }}</span>
          </div>
        </div>
      </div>
      <div
        class="d-flex d-lg-none align-items-center justify-content-between mx-2"
      >
        <div
          class="cursor-pointer position-relative"
          @click="setShowMenu(true)"
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
            <div
              class="position-relative mx-2"
              :key="cartItems"
            >
              <i class="ri-clipboard-line fs-24"></i>
              <span
                class="badge badge-danger position-absolute top-0 start-100 whb-top-bar translate-middle badge-rounded lh-1"
              >
                {{ cartItems.length || 0 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="search-bar d-block d-lg-none my-2 mx-3 wv-100">
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
      :key="items"
      @setShowMenu="setShowMenu"
    />
    <LoginModal
      v-if="showLoginModal"
      :key="showLoginModal"
      :userStore="userStore"
      @setShowLoginModal="setShowLoginModal"
    />
    <CartModal
      v-if="showCartModal"
      :key="cartItems"
      :items="cartItems"
      :totalPrice="calculateCartTotalPrice"
      @setShowCartModal="setShowCartModal"
    />
  </header>
</template>
<script>
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useLayoutStore, useCategoryStore, useUserStore } from '@/state';
import Navbar from './NavbarView.vue';
import MobileMenu from './MobileMenu.vue';
import LoginModal from '../modals/LoginModal.vue';
import CartModal from '../modals/CartModal.vue';
import { logoutUser } from '@/utils/authUtils';

export default {
  components: { Navbar, MobileMenu, LoginModal, CartModal },

  setup() {
    const router = useRouter();
    const toast = useToast();
    const layoutStore = useLayoutStore();
    const categoryStore = useCategoryStore();
    const userStore = useUserStore();

    const items = computed(() => categoryStore.headerCategories);
    const isAuthenticated = computed(() => userStore.user.isAuthenticated);
    const cartItems = computed(() => userStore.user.cart_items);
    const showMenu = computed(() => layoutStore.layout.showMenu);
    const showLoginModal = computed(() => layoutStore.layout.showLoginModal);
    const showCartModal = computed(() => layoutStore.layout.showCartModal);
    const isUserMenuVisible = ref(false);
    const calculateCartTotalPrice = computed(() => {
      let total = 0;
      cartItems.value.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      return total || 0;
    });

    const toggleUserMenu = (value) => {
      isUserMenuVisible.value = value ?? !isUserMenuVisible.value;
    };

    const setShowMenu = (value) => {
      layoutStore.setShowMenu(value);
    };

    const setShowLoginModal = (value) => {
      layoutStore.setShowLoginModal(value);
    };

    const setShowCartModal = (value) => {
      layoutStore.setShowCartModal(value);
    };

    const logout = async () => {
      const response = await logoutUser(userStore);
      if (response) {
        toast.success('Logout Successful');
        router.push({ name: 'home' });
        return;
      }

      toast.error('Logout Failed');
    };

    const getHeaderCategories = async () => {
      await categoryStore.getHeaderCategories();
    };

    onBeforeMount(async () => {
      await getHeaderCategories();
    });

    return {
      setShowMenu,
      showMenu,
      items,
      showLoginModal,
      setShowLoginModal,
      userStore,
      isUserMenuVisible,
      toggleUserMenu,
      isAuthenticated,
      logout,
      showCartModal,
      setShowCartModal,
      cartItems,
      calculateCartTotalPrice,
    };
  },
};
</script>
<style scoped>
.badge-rounded {
  border-radius: 50%;
}

.dropdown-menu {
  display: block;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.dropdown-menu.show {
  visibility: visible;
  opacity: 1;
}

.dropdown-toggle::after {
  display: none;
}
</style>
