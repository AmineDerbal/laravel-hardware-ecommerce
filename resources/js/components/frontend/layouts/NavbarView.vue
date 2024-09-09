<template>
  <div class="whb-top-bar py-2 d-none d-lg-block">
    <nav class="navbar navbar-light">
      <div class="mx-5 d-flex align-items-center gap-2">
        <div
          v-for="category in items"
          :key="category.id"
        >
          <button
            class="navbar-toggler text-white border-0 outline-0"
            type="button"
            v-if="category.children.length === 0"
            @click="goToCategoryProductPage(category.slug)"
          >
            {{ category.name }}
          </button>

          <DropdownButton
            v-else
            :item="category"
          />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import DropdownButton from '../Buttons/DropdownButton.vue';

export default {
  components: {
    DropdownButton,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  methods: {
    goToCategoryProductPage(slug) {
      this.$router.push({ name: 'category-products', params: { slug } });
    },
  },
};
</script>
