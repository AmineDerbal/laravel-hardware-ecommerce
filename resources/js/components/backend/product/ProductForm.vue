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
              placeholder="name"
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
              placeholder="price"
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
              placeholder="stock"
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
            <div>
              <ckeditor
                v-model="product.description"
                :editor="editor"
              ></ckeditor>
            </div>

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
              @click="handleSubmitForm"
              :variant="'primary'"
            >
              Save
            </BButton>
          </div>
        </BCol>
      </BRow>
    </BCardBody>
  </BForm>
  <div v-if="isEditing">
    <BForm class="needs-validation bg-light px-4 py-3 mt-3">
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
                @click="handleUpdateThumbnailImage"
                :variant="'primary'"
              >
                Save Changes
              </BButton>
            </div>
          </BCol>
        </BRow>
      </BCardBody>
    </BForm>
    <BForm class="needs-validation bg-light px-4 py-3 mt-3">
      <BCardHeader>
        <h5 class="card-title mb-2">Edit Product Images</h5>
      </BCardHeader>
      <BCardBody class="mt-3">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th
                  scope="col"
                  class="text-center"
                >
                  Image
                </th>
                <th
                  scope="col"
                  class="text-center"
                >
                  Change Image
                </th>
                <th
                  scope="col"
                  class="text-center"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(image, index) in product.images"
                :key="image.id"
              >
                <td>{{ index + 1 }}</td>
                <td class="text-center w-25">
                  <img
                    :src="image.image_url"
                    class="img-fluid w-25 rounded"
                  />
                </td>
                <td>
                  <input
                    type="file"
                    class="form-control w-75"
                    @change="
                      handleUpdateImageFileChange($event, {
                        id: image.id,
                        product_id: image.product_id,
                      })
                    "
                    accept="image/*"
                  />
                </td>
                <td class="d-flex justify-content-center gap-2">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    @click="
                      updateImage({
                        id: image.id,
                        product_id: image.product_id,
                      })
                    "
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="deleteImage(image.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <BRow>
          <BCol lg="9">
            <div class="mb-3">
              <input
                type="file"
                class="form-control"
                id="newImageInput"
                @change="handleNewImageFileChange($event)"
                accept="image/*"
              />
              <span
                class="text-danger"
                v-if="errors.image && errors.image[0]"
                >{{ errors.image[0] }}</span
              >
            </div>
          </BCol>
          <BCol lg="3">
            <div class="text-end">
              <BButton
                type="submit"
                class="btn-animation waves-effect waves-light"
                @click="addNewImage(product.id)"
                :variant="'primary'"
              >
                Add Image
              </BButton>
            </div></BCol
          >
        </BRow>
      </BCardBody>
    </BForm>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useToast } from 'vue-toastification';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    },
    updateThumbnailImage: {
      type: Function,
    },
  },

  components: {
    ckeditor: CKEditor.component,
  },

  methods: {
    handleSubmitForm() {
      this.$emit('update:product', this.product);
      this.submitForm();
    },

    handleUpdateThumbnailImage() {
      this.$emit('update:product', this.product);
      this.updateThumbnailImage();
    },
  },

  data() {
    return {
      editor: ClassicEditor,
      editorData:
        '<h3>Hello World!</h3><h5><b>This is an simple editable area.</b></h5>',
      content: '<h1>Some initial content</h1>',

      plugins: [
        'advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
        'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
        'save table contextmenu directionality emoticons template paste textcolor',
      ],
      toolbar:
        'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
      options: {
        height: 300,
        style_formats: [
          { title: 'Bold text', inline: 'b' },
          { title: 'Red text', inline: 'span', styles: { color: '#ff0000' } },
          { title: 'Red header', block: 'h1', styles: { color: '#ff0000' } },
          { title: 'Example 1', inline: 'span', classes: 'example1' },
          { title: 'Example 2', inline: 'span', classes: 'example2' },
          { title: 'Table styles' },
          { title: 'Table row 1', selector: 'tr', classes: 'tablerow1' },
        ],
      },
    };
  },

  setup(props, { emit }) {
    const toast = useToast();
    const thumbnailImage = ref('');
    const images = [];
    const imagePreviews = ref([]);
    const newImage = { file: null };
    const updateImages = [];

    const state = reactive({
      content:
        "<h3><span class='ql-size-large;'>Hello World!</span></h3><p><br></p><h3>This is an simple editable area.</h3><p><br></p><ul><li>Select a text to reveal the toolbar.</li><li>Edit rich document on-the-fly, so elastic!</li></ul><p><br></p><p>End of simple area</p>",
      _content: '',
      disabled: false,
    });

    const handleUpdateImageFileChange = async ($event, { id, product_id }) => {
      const file = await $event.target.files[0];
      const data = { id, product_id, image: file };

      // check if a value with id and product_id already exists
      const index = updateImages.findIndex(
        (image) => image.id === id && image.product_id === product_id,
      );
      if (index === -1) {
        updateImages.push(data);
      } else {
        updateImages[index] = data;
      }
    };

    const updateImage = async ({ id, product_id }) => {
      const data = updateImages.find(
        (image) => image.id === id && image.product_id === product_id,
      );
      if (!data || !data.image) {
        toast.error('Please select an image');
        return;
      }
      emit('updateImage', data);
    };

    const deleteImage = async (id) => {
      emit('deleteImage', id);
    };

    const handleNewImageFileChange = async ($event) => {
      const file = await $event.target.files[0];
      newImage.file = file;
    };

    const addNewImage = async (product_id) => {
      emit('addNewImage', { product_id, image: newImage.file });
    };

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
      handleNewImageFileChange,
      addNewImage,
      handleUpdateImageFileChange,
      updateImage,
      deleteImage,
      state,
    };
  },
};
</script>
