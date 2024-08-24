<template>
  <footer class="footer-container py-3 mt-2">
    <div class="mx-4 d-flex justify-content-between align-items-center gap-2">
      <div class="logo">
        <router-link to="/">
          <img
            src="@/assets/images/logo.png"
            alt="logo"
            height="80"
          />
        </router-link>
      </div>
      <div
        class="text-white w-50 d-flex justify-content-center flex-wrap align-items-center fw-semibold"
      >
        <p>1501 Locust View Drive, San Diego, CA 92101</p>
      </div>

      <div class="social-links text-white d-flex gap-1">
        <a href="#"><i class="ri-facebook-fill text-white fs-24"></i></a>
        <a href="#"><i class="ri-twitter-fill text-white fs-24"></i></a>
        <a href="#"><i class="ri-instagram-fill text-white fs-24"></i></a>
        <a href="#"><i class="ri-whatsapp-fill text-white fs-24"></i></a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  background-color: rgb(55, 56, 57);

  width: 100%;
}
</style>
