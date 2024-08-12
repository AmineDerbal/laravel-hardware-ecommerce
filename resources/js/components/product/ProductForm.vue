<template>
  <BForm class="needs-validation bg-light px-4 py-3">
    <BCardHeader>
      <h5 class="card-title mb-2">
        {{ isEditing ? 'Update' : 'Fill' }} Product Details
      </h5>
    </BCardHeader>
    <BCardBody class="mt-3">
      <BRow>
        <BCol lg="6">
          <div class="mb-3">
            <label
              for="nameInput"
              class="form-label"
            >
              Name <span class="text-danger">{{ !isEditing ? '*' : '' }}</span>
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
          <div class="mb-3">
            <label
              for="categoryInput"
              class="form-label"
              >Category
              <span class="text-danger">{{
                !isEditing ? '*' : ''
              }}</span></label
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
          </div>
        </BCol>
      </BRow>
      <BRow>
        <BCol lg="6">
          <div class="mb-3">
            <label
              for="priceInput"
              class="form-label"
              >Price
              <span class="text-danger">{{
                !isEditing ? '*' : ''
              }}</span></label
            >
            <BFormInput
              type="number"
              class="form-control"
              v-model="product.price"
              :placeholder="price"
              step="0.01"
              id="priceInput"
            />
            <span
              class="text-danger"
              v-if="errors.price && errors.price[0]"
              >{{ errors.price[0] }}</span
            >
          </div>
        </BCol>
        <BCol lg="6">
          <div class="mb-3">
            <label
              for="stockInput"
              class="form-label"
              >Stock
              <span class="text-danger">{{
                !isEditing ? '*' : ''
              }}</span></label
            >
            <BFormInput
              type="number"
              class="form-control"
              v-model="product.stock"
              :placeholder="stock"
              id="stockInput"
            />
            <span
              class="text-danger"
              v-if="errors.stock && errors.stock[0]"
              >{{ errors.stock[0] }}</span
            >
          </div>
        </BCol>
      </BRow>
      <BRow v-if="!isEditing">
        <BCol lg="6">
          <div class="mb-3">
            <label
              for="thumbnailInput"
              class="form-label"
              >thumbnail Image <span class="text-danger">*</span></label
            >
            <input
              type="file"
              class="form-control"
              id="thumbnailInput"
              @change="handleFileChange($event)"
              accept="image/*"
            />

            <img
              v-if="thumbnailImage"
              :src="thumbnailImage"
              class="img-fluid w-25 mt-2"
              alt=""
            />

            <span
              class="text-danger"
              v-if="errors.thumbnail && errors.thumbnail[0]"
              >{{ errors.thumbnail[0] }}</span
            >
          </div>
        </BCol>
        <BCol lg="6">
          <div class="mb-3">
            <label
              for="multipleImageInput"
              class="form-label"
            >
              multiple Images
            </label>
            <input
              type="file"
              class="form-control"
              id="multipleImageInput"
              @change="handleMultipleImagesChange($event)"
              accept="image/*"
              multiple
            />
            <div class="row mt-2 g-1">
              <img
                v-if="imagePreviews.length > 0"
                v-for="image in imagePreviews"
                :key="image"
                :src="image"
                class="img-fluid w-25"
              />
            </div>
            <span
              class="text-danger"
              v-if="errors.images && errors.images[0]"
              >{{ errors.images[0] }}</span
            >
          </div>
        </BCol>
      </BRow>
      <BRow>
        <BCol lg="12">
          <div class="mb-3">
            <label
              for="descriptionInput"
              class="form-label"
              >description
            </label>
            <BFormTextarea
              id="descriptionInput"
              v-model="product.description"
              :placeholder="description"
              rows="3"
            ></BFormTextarea>
            <span
              class="text-danger"
              v-if="errors.description && errors.description[0]"
              >{{ errors.description[0] }}</span
            >
          </div>
        </BCol>
      </BRow>
      <BRow class="mt-3">
        <BCol
          lg="12"
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
      </BRow>
    </BCardBody>
  </BForm>
  <BForm
    class="needs-validation bg-light px-4 py-3 mt-3"
    v-if="isEditing"
  >
    <BCardHeader>
      <h5 class="card-title mb-2">Update Thumbnail Image</h5>
    </BCardHeader>
    <BCardBody class="mt-3">
      <BRow>
        <BCol lg="6">
          <div class="mb-3">
            <label
              for="thumbnailInput"
              class="form-label"
              >thumbnail Image
            </label>
            <input
              type="file"
              class="form-control"
              id="thumbnailInput"
              @change="handleFileChange($event)"
              accept="image/*"
            />
            <img
              v-if="thumbnailImage || product.image_url"
              :src="thumbnailImage || product.image_url"
              class="img-fluid w-25 mt-2"
              alt=""
            />
            <span
              class="text-danger"
              v-if="errors.thumbnail && errors.thumbnail[0]"
              >{{ errors.thumbnail[0] }}</span
            >
          </div>
        </BCol>
      </BRow>
      <BRow class="mt-3">
        <BCol
          lg="12"
          class="mx-auto"
        >
          <div class="text-end">
            <BButton
              type="submit"
              class="btn-animation waves-effect waves-light"
              :variant="'primary'"
            >
              Save Changes
            </BButton>
          </div>
        </BCol>
      </BRow>
    </BCardBody>
  </BForm>
</template>

<script>
import { BCol } from 'bootstrap-vue-next';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

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
    submitForm: {
      type: Function,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    submitForm() {
      this.$emit('update:product', this.product);
      this.submitForm();
    },
  },

  setup(props, { emit }) {
    const toast = useToast();
    const thumbnailImage = ref('');
    const images = [];
    const imagePreviews = ref([]);

    const handleFileChange = async ($event) => {
      const file = $event.target.files[0];
      const product = props.product;
      product.thumbnail = file;
      emit('update:product', product);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          thumbnailImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const handleMultipleImagesChange = async ($event) => {
      const product = props.product;
      const files = $event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file && file.type.startsWith('image/')) {
          images.push(file);
          //Create a preview Url for the image
          const reader = new FileReader();
          reader.onload = (e) => {
            imagePreviews.value.push(e.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          toast.error('Invalid file type. Only images are allowed');
        }
      }
      product.images = images;
      emit('update:product', product);
    };
    return {
      handleFileChange,
      thumbnailImage,
      handleMultipleImagesChange,
      imagePreviews,
    };
  },
};
</script>
