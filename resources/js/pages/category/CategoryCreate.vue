<script>
import { onBeforeMount, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { LayoutView, LoaderView } from '@/components';
import { useCategoryStore } from '@/state';

export default {
  components: { LayoutView, LoaderView },

  setup() {
    const toast = useToast();
    const router = useRouter();
    const store = useCategoryStore();
    const errors = computed(() => store.errors);
    const selectChoicesCategories = computed(() => store.selectCategories);
    const isLoading = computed(() => store.isLoading);
    const category = ref({
      name: null,
      parent_id: null,
    });

    const capitalizeFirstLetter = (str) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const submitForm = async () => {
      category.value.name = capitalizeFirstLetter(category.value.name);
      const response = await store.createCategory(category.value);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message, { timeout: 2000 });

        router.push({ name: 'category-list' });
      } else {
        toast.error('Failed to create category');
      }
    };

    onBeforeMount(async () => {
      await store.getSelectCategories();
    });

    return {
      category,
      errors,
      selectChoicesCategories,
      isLoading,
      submitForm,
    };
  },
};
</script>

<template>
  <LayoutView>
    <LoaderView v-if="isLoading" />
    <BForm
      class="needs-validation"
      v-else
    >
      <BCardHeader>
        <h5 class="card-title mb-2">Fill Category Details</h5>
      </BCardHeader>
      <BCardBody class="mt-3">
        <BRow>
          <BCol
            lg="6"
            class="mx-auto"
          >
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
                v-if="errors.name && errors.name[0]"
                >{{ errors.name[0] }}</span
              >
            </div>
          </BCol>
        </BRow>
        <BRow>
          <BCol
            lg="6"
            class="mx-auto"
          >
            <label
              for="firstNameinput"
              class="form-label"
              >parent categorie</label
            >
            <BFormSelect
              v-model="category.parent_id"
              class="mb-3"
              aria-label="Default select example"
            >
              <BFormSelectOption :value="null"
                >Select Categorie</BFormSelectOption
              >
              <BFormSelectOption
                v-for="category in selectChoicesCategories"
                :key="category.id"
                :value="category.id"
                >{{ category.name }}</BFormSelectOption
              >
            </BFormSelect>
            <span
              class="text-danger"
              v-if="errors.parent_id"
              >{{ errors.parent_id[0] }}</span
            >
          </BCol>
        </BRow>
        <Brow>
          <BCol
            lg="6"
            class="mx-auto"
          >
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
        </Brow>
      </BCardBody>
    </BForm>
  </LayoutView>
</template>
