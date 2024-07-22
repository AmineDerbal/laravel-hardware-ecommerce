<script>
import Menu from './menu.vue';
import simplebar from 'simplebar-vue';

localStorage.setItem('hoverd', false);

export default {
  components: { Menu, simplebar },

  methods: {
    initActiveMenu() {
      if (
        document.documentElement.getAttribute('data-sidebar-size') ===
        'sm-hover'
      ) {
        localStorage.setItem('hoverd', true);
        document.documentElement.setAttribute(
          'data-sidebar-size',
          'sm-hover-active',
        );
      } else if (
        document.documentElement.getAttribute('data-sidebar-size') ===
        'sm-hover-active'
      ) {
        localStorage.setItem('hoverd', false);
        document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
      } else {
        document.documentElement.setAttribute('data-sidebar-size', 'sm-hover');
      }
    },
  },

  mounted() {
    document.getElementById('overlay').addEventListener('click', () => {
      document.body.classList.remove('vertical-sidebar-enable');
    });
    if (window.screen.width < 1025) {
      document.documentElement.setAttribute('data-sidebar-size', 'sm');
    }
    document.querySelector('.hamburger-icon').classList.add('open');
    window.addEventListener('resize', () => {
      document.body.classList.remove('vertical-sidebar-enable');

      if (
        document.documentElement.getAttribute('data-sidebar-size') === 'lg' &&
        !document.body.classList.contains('vertical-sidebar-enable')
      ) {
        document.querySelector('.hamburger-icon').classList.remove('open');
      } else if (
        document.documentElement.getAttribute('data-sidebar-size') === 'lg' &&
        document.body.classList.contains('vertical-sidebar-enable')
      ) {
        document.querySelector('.hamburger-icon').classList.add('open');
      }
    });
  },
  unmounted() {
    window.removeEventListener('resize', this.updateSidebarSize);
  },
};
</script>

<template>
  <div>
    <!-- ========== Left Sidebar Start ========== -->
    <!-- ========== App Menu ========== -->
    <div class="app-menu navbar-menu">
      <!-- LOGO -->
      <div class="navbar-brand-box">
        <!-- Dark Logo-->
        <router-link
          to="/"
          class="logo logo-dark"
        >
          <span class="logo-sm">
            <img
              src="@/assets/images/logo.png"
              alt=""
              height="22"
            />
          </span>
          <span class="logo-lg">
            <img
              src="@/assets/images/logo.png"
              alt=""
              height="17"
            />
            Hardware
          </span>
        </router-link>
        <!-- Light Logo-->
        <router-link
          to="/"
          class="logo logo-light"
        >
          <span class="logo-sm">
            <img
              src="@/assets/images/logo.png"
              alt=""
              height="22"
            />
          </span>
          <span class="logo-lg">
            <img
              src="@/assets/images/logo.png"
              alt=""
              height="17"
            />
            Hardware
          </span>
        </router-link>
        <button
          type="button"
          class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover"
          @click="initActiveMenu"
        >
          <i class="ri-record-circle-line"></i>
        </button>
      </div>

      <simplebar
        id="scrollbar"
        class="h-100"
        ref="scrollbar"
      >
        <Menu></Menu>
      </simplebar>
      <div class="sidebar-background"></div>
    </div>
    <!-- Left Sidebar End -->
    <!-- Vertical Overlay-->
    <div
      class="vertical-overlay"
      id="overlay"
    ></div>
  </div>
</template>
