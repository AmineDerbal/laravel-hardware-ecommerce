<template>
  <headerView />

  <div class="main-content">
    <div class="page-content">
      <!-- Start Content-->
      <BContainer fluid>
        <slot />
      </BContainer>
    </div>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';

export default {
  components: { HeaderView },
};
</script>
