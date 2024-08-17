<script>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import router from '@/router/index';
import { useLayoutStore } from '@/state';
import { computed } from 'vue';
localStorage.setItem('hoverd', false);

export default {
  components: { Navbar, Sidebar },

  data() {
    return {
      isMenuCondensed: false,
      layoutType: localStorage.getItem('layout')
        ? localStorage.getItem('layout').type
        : useLayoutStore().layout.type,
    };
  },
  created: () => {
    const layoutStore = useLayoutStore();
    const layout = computed(() => layoutStore.layout);
    document.documentElement.setAttribute(
      'data-bs-theme',
      layout.value.themeMode,
    );
    document.documentElement.setAttribute(
      'data-sidebar',
      layout.value.sidebarTheme,
    );
  },
  methods: {
    updateSidebarSize() {
      let sidebarSize = '';
      // Check window.screen.width and update the data-sidebar-size attribute
      if (window.innerWidth < 1025) {
        this.sidebarSize = 'sm';
        sidebarSize = 'sm';
      } else {
        this.sidebarSize = 'lg'; // Reset sidebarSize if screen width is >= 1025
        sidebarSize = 'lg';
      }
      // Update the data-sidebar-size attribute of document.documentElement
      document.documentElement.setAttribute('data-sidebar-size', sidebarSize);
    },

    toogleSidebarSize() {
      document.body.classList.remove('vertical-sidebar-enable');

      this.updateSidebarSize();
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
      } else if (
        document.documentElement.getAttribute('data-sidebar-size') === 'sm'
      ) {
        document.querySelector('.hamburger-icon').classList.add('open');
      }
    },

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

    toggleMenu() {
      document.body.classList.toggle('sidebar-enable');
      if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove('sidebar-enable');
          document.body.classList.remove('vertical-collpsed');
        });
        document.body.classList.toggle('vertical-collpsed');
      } else {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove('sidebar-enable');
        });
        document.body.classList.remove('vertical-collpsed');
      }
      this.isMenuCondensed = !this.isMenuCondensed;
    },
    toggleRightSidebar() {
      document.body.classList.toggle('right-bar-enabled');
    },
    hideRightSidebar() {
      document.body.classList.remove('right-bar-enabled');
    },
  },
  mounted() {
    document.documentElement.setAttribute('data-layout', 'vertical');
    if (localStorage.getItem('hoverd') == 'true') {
      document.documentElement.setAttribute(
        'data-sidebar-size',
        'sm-hover-active',
      );
    }

    if (window.screen.width < 1025) {
      document.documentElement.setAttribute('data-sidebar-size', 'sm');
    }
    this.toogleSidebarSize();

    window.addEventListener('resize', () => {
      this.toogleSidebarSize();
    });
  },
  unmounted() {
    window.removeEventListener('resize', this.updateSidebarSize);
  },
};
</script>

<template>
  <div
    id="layout-wrapper"
    :data-layout="layoutType"
  >
    <Navbar />

    <Sidebar />

    <div class="main-content">
      <div class="page-content">
        <!-- Start Content-->
        <BContainer fluid>
          <slot />
        </BContainer>
      </div>
    </div>
  </div>
</template>
