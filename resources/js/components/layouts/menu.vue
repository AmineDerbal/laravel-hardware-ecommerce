<script>
import { HomeIcon } from '@zhuowenli/vue-feather-icons';

export default {
  components: {
    HomeIcon,
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
    </ul>
  </BContainer>
</template>
