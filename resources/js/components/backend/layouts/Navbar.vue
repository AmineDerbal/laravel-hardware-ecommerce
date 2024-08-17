<script>
import simplebar from 'simplebar-vue';
import { useLayoutStore } from '@/state';

export default {
  components: { simplebar },

  methods: {
    toggleHamburgerMenu() {
      let windowSize = window.innerWidth;
      document.documentElement.setAttribute('data-sidebar-visibility', 'show');
      let visiblilityType = document.documentElement.getAttribute(
        'data-sidebar-visibility',
      );

      if (windowSize > 767)
        document.querySelector('.hamburger-icon').classList.toggle('open');

      //For collapse vertical menu

      if (visiblilityType === 'show') {
        if (windowSize < 1025 && windowSize > 767) {
          document.body.classList.remove('vertical-sidebar-enable');
          document.documentElement.getAttribute('data-sidebar-size') == 'sm'
            ? document.documentElement.setAttribute('data-sidebar-size', '')
            : document.documentElement.setAttribute('data-sidebar-size', 'sm');
        } else if (windowSize > 1025) {
          document.body.classList.remove('vertical-sidebar-enable');
          document.documentElement.getAttribute('data-sidebar-size') == 'lg'
            ? document.documentElement.setAttribute('data-sidebar-size', 'sm')
            : document.documentElement.setAttribute('data-sidebar-size', 'lg');
        } else if (windowSize <= 767) {
          document.body.classList.add('vertical-sidebar-enable');
          document.documentElement.setAttribute('data-sidebar-size', 'lg');
          document.querySelector('.hamburger-icon').classList.remove('open');
        }
      }
    },

    toggleMenu() {
      this.$parent.toggleMenu();
    },

    initFullScreen() {
      document.body.classList.toggle('fullscreen-enable');
      if (
        !document.fullscreenElement &&
        /* alternative standard method */
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT,
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },

    toggleDarkMode() {
      const layoutStore = useLayoutStore();

      if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        layoutStore.changeThemeMode('light');
        document.documentElement.setAttribute('data-sidebar', 'light');
        layoutStore.changeSidebarTheme('light');
      } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        layoutStore.changeThemeMode('dark');
        document.documentElement.setAttribute('data-sidebar', 'dark');
        layoutStore.changeSidebarTheme('dark');
      }
    },
  },

  mounted() {
    document.addEventListener('scroll', function () {
      let pageTopbar = document.getElementById('page-topbar');
      if (pageTopbar) {
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
          ? pageTopbar.classList.add('topbar-shadow')
          : pageTopbar.classList.remove('topbar-shadow');
      }
    });
    if (document.getElementById('topnav-hamburger-icon'))
      document
        .getElementById('topnav-hamburger-icon')
        .addEventListener('click', this.toggleHamburgerMenu);
  },

  setup() {
    const logout = () => {
      console.log('logout');
    };

    return { logout };
  },
};
</script>

<template>
  <header id="page-topbar">
    <div class="layout-width">
      <div class="navbar-header">
        <div class="d-flex">
          <button
            type="button"
            class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
            id="topnav-hamburger-icon"
          >
            <span class="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        <div class="d-flex align-items-center">
          <div class="ms-1 header-item d-none d-sm-flex">
            <BButton
              type="button"
              variant="ghost-secondary"
              class="btn-icon btn-topbar rounded-circle"
              data-toggle="fullscreen"
              @click="initFullScreen"
            >
              <i class="bx bx-fullscreen fs-22"></i>
            </BButton>
          </div>

          <div class="ms-1 header-item d-none d-sm-flex">
            <BButton
              type="button"
              variant="ghost-secondary"
              class="btn-icon btn-topbar rounded-circle light-dark-mode"
              @click="toggleDarkMode"
            >
              <i class="bx bx-moon fs-22"></i>
            </BButton>
          </div>
          <div class="ms-1 header-item d-none d-sm-flex">
            <BButton
              type="button"
              variant="ghost-secondary"
              class="btn-icon btn-topbar rounded-circle"
              @click="logout"
            >
              <i class="mdi mdi-logout text-muted fs-22 align-middle me-1"></i>
            </BButton>
          </div>

          <BDropdown
            variant="link"
            :style="{
              display: 'none',
            }"
            class="ms-sm-3 header-item topbar-user"
            toggle-class="rounded-circle arrow-none"
            menu-class="dropdown-menu-end"
            :offset="{ alignmentAxis: -14, crossAxis: 0, mainAxis: 0 }"
          >
            <template #button-content>
              <span class="d-flex align-items-center">
                <img
                  class="rounded-circle header-profile-user"
                  src="@/assets/images/users/avatar-1.jpg"
                  alt="Header Avatar"
                />
                <span class="text-start ms-xl-2">
                  <span
                    class="d-none d-xl-inline-block ms-1 fw-medium user-name-text"
                    >Edward Diana</span
                  >
                  <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text"
                    >Founder</span
                  >
                </span>
              </span>
            </template>
            <h6 class="dropdown-header">Welcome Anna!</h6>
            <router-link
              class="dropdown-item"
              to="/pages/profile"
              ><i
                class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"
              ></i>
              <span class="align-middle"> Profile</span>
            </router-link>
            <router-link
              class="dropdown-item"
              to="/chat"
            >
              <i
                class="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"
              ></i>
              <span class="align-middle"> Messages</span>
            </router-link>
            <router-link
              class="dropdown-item"
              to="/apps/tasks-kanban"
            >
              <i
                class="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"
              ></i>
              <span class="align-middle"> Taskboard</span>
            </router-link>
            <router-link
              class="dropdown-item"
              to="/pages/faqs"
              ><i
                class="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"
              ></i>
              <span class="align-middle"> Help</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link
              class="dropdown-item"
              to="/pages/profile"
              ><i class="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>
              <span class="align-middle"> Balance : <b>$5971.67</b></span>
            </router-link>
            <router-link
              class="dropdown-item"
              to="/pages/profile-setting"
            >
              <BBadge
                variant="success-subtle"
                class="bg-success-subtle text-success mt-1 float-end"
                >New</BBadge
              ><i
                class="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"
              ></i>
              <span class="align-middle"> Settings</span>
            </router-link>
            <router-link
              class="dropdown-item"
              to="/auth/lockscreen-basic"
              ><i class="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>
              <span class="align-middle"> Lock screen</span>
            </router-link>
            <router-link
              class="dropdown-item"
              to="/logout"
              ><i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
              <span
                class="align-middle"
                data-key="t-logout"
              >
                Logout</span
              >
            </router-link>
          </BDropdown>
        </div>
      </div>
    </div>
  </header>
</template>
