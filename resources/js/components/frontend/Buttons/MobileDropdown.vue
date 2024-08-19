<template>
  <div class="w-100">
    <div class="cursor-pointer d-flex w-100">
      <p
        class="fw-bold text-uppercase w-75 gray-border p-3 m-0"
        @click="
          $router.push({
            name: 'category-products',
            params: { slug: item.slug },
          })
        "
      >
        {{ item.name }}
      </p>
      <span
        class="d-flex align-items-center gray-border justify-content-center w-25"
        @click="toggleDropdown"
      >
        <i
          v-if="showDropdown"
          class="ri-arrow-up-s-line fs-24"
        ></i>
        <i
          v-else
          class="ri-arrow-down-s-line fs-24"
        ></i>
      </span>
    </div>
    <div v-if="showDropdown">
      <div
        v-for="child in item.children"
        :key="child.id"
      >
        <div
          v-if="child.children.length < 1"
          class="p-3 d-flex w-100 align-items-center gray-border cursor-pointer"
          @click="
            $router.push({
              name: 'category-products',
              params: { slug: child.slug },
            })
          "
        >
          <p class="fw-bold text-uppercase hover-header-link">
            {{ child.name }}
          </p>
        </div>
        <MobileDropdown
          v-else
          :item="child"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'MobileDropdown',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const showDropdown = ref(false);
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };
    return {
      showDropdown,
      toggleDropdown,
    };
  },
};
</script>
