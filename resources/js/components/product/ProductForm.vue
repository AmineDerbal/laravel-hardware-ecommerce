<template>
  <BForm class="needs-validation">
    <BCardHeader>
      <h5 class="card-title mb-2">Fill Product Details</h5>
    </BCardHeader>
    <BCardBody class="mt-3">
      <BRow>
        <BCol lg="6">
          <div class="mb-3">
            <label
              for="nameInput"
              class="form-label"
            >
              name <span class="text-danger">*</span>
            </label>
            <BFormInput
              type="text"
              class="form-control"
              v-model="product.name"
              :placeholder="name"
              id="nameInput"
            />
            <span
              class="text-danger"
              v-if="errors.name && errors.name[0]"
              >{{ errors.name[0] }}</span
            >
          </div>
        </BCol>
        <BCol lg="6">
          <label
            for="categoryInput"
            class="form-label"
            >Category</label
          >
          <BFormSelect
            v-model="product.category_id"
            class="mb-3"
            aria-label="Default select example"
          >
            <BFormSelectOption :value="null"
              >Select Categorie</BFormSelectOption
            >
            <BFormSelectOption
              v-for="category in selectCategories"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}</BFormSelectOption
            >
          </BFormSelect>
          <span
            class="text-danger"
            v-if="errors.category_id && errors.category_id[0]"
            >{{ errors.category_id[0] }}</span
          >
        </BCol>
      </BRow>
    </BCardBody>
  </BForm>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    },
    selectCategories: {
      type: Array,
      required: true,
    },
  },
};
</script>
