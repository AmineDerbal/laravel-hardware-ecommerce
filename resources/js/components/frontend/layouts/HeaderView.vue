<template>
  <header>
    <div class="top-bar whb-top-bar py-2">
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
        class="container d-flex justify-content-between align-items-center gap-2"
      >
        <div class="logo">
          <router-link to="/">
            <img
              src="@/assets/images/logo.png"
              alt="logo"
              height="100"
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
    </div>
    <Navbar />
  </header>
</template>
<script>
import Navbar from './NavbarView.vue';

export default {
  components: { Navbar },
};
</script>
<style scoped>
.badge-rounded {
  border-radius: 50%;
}
</style>
