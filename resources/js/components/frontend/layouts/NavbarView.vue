<template>
  <div class="whb-top-bar py-2">
    <nav class="navbar navbar-light">
      <div class="d-flex align-items-center gap-2">
        <div
          v-for="category in headerCategories"
          :key="category.id"
        >
          <button
            class="navbar-toggler text-white"
            type="button"
            v-if="category.children.length === 0"
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
import { onBeforeMount, computed } from 'vue';
import { useCategoryStore } from '@/state';
import DropdownButton from './Buttons/DropdownButton.vue';

export default {
  components: {
    DropdownButton,
  },
  setup() {
    const store = useCategoryStore();
    const headerCategories = computed(() => store.headerCategories);

    const getHeaderCategories = async () => {
      await store.getHeaderCategories();
    };

    onBeforeMount(async () => {
      await getHeaderCategories();
    });

    return {
      headerCategories,
    };
  },
};
</script>
