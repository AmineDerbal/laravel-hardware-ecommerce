<template>
  <BForm class="needs-validation">
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
            for="parentInput"
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
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    },
    selectChoicesCategories: {
      type: Array,
      required: true,
    },
    submitForm: {
      type: Function,
      required: true,
    },
  },

  methods: {
    submitForm() {
      this.$emit('update:category', this.category);
      this.submitForm();
    },
  },
};
</script>
