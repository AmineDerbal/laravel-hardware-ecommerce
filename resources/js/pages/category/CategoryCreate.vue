<script>
import { onBeforeMount, computed, ref } from 'vue';
import { LayoutView, LoaderView } from '@/components';
import { useCategoryStore } from '@/state';

export default {
  components: { LayoutView, LoaderView },

  setup() {
    const store = useCategoryStore();
    const errors = computed(() => store.errors);
    const selectChoicesCategories = computed(() => store.selectCategories);
    const isLoading = computed(() => store.isLoading);
    const category = ref({
      name: null,
      parent_id: null,
    });

    onBeforeMount(async () => {
      await store.getSelectCategories();
    });

    return {
      category,
      errors,
      selectChoicesCategories,
      isLoading,
    };
  },
};
</script>

<template>
  <LayoutView>
    <BForm class="needs-validation">
      <BCardHeader>
        <h5 class="card-title mb-2">Fill Category Details</h5>
      </BCardHeader>
      <BCardBody class="mt-3">
        <BRow>
          <BCol lg="6">
            <div class="mb-3">
              <label
                for="firstNameinput"
                class="form-label"
                >name <span class="text-danger">*</span></label
              >
              <BFormInput
                type="text"
                class="form-control"
                v-model="category.name"
                :placeholder="name"
                id="firstNameinput"
              />
              <span
                class="text-danger"
                v-if="errors.name"
                >{{ errors.name[0] }}</span
              >
            </div>
          </BCol>

          <BCol lg="12">
            <div class="text-end">
              <BButton
                type="submit"
                class="btn-animation waves-effect waves-light"
                @click="submitForm"
                :variant="'primary'"
              >
                Save
              </BButton>
            </div>
          </BCol>
        </BRow>
      </BCardBody>
    </BForm>
  </LayoutView>
</template>
