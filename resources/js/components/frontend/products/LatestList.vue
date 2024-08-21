<template>
  <BRow class="g-3 mx-5">
    <BCol
      cols="12"
      xs="6"
      sm="6"
      md="4"
      lg="3"
      class="d-flex align-items-stretch"
      v-for="item in items"
      :key="item.id"
    >
      <BCard
        no-body
        class="d-flex flex-column"
      >
        <img
          class="card-img-top img-fluid w-100 h-75 object-fit cursor-pointer"
          :src="item.image_url"
          alt="Card image cap"
          @click="viewProduct(item.slug)"
        />
        <BCardBody
          class="d-flex flex-column flex-grow-1 justify-content-between h-100"
        >
          <BCardTitle
            class="mb-2 text-start d-flex flex-column h-100 cursor-pointer"
            @click="viewProduct(item.slug)"
            >{{ item.name }}</BCardTitle
          >
          <p class="card-text whb-red-text fs-24 text-center">
            $ {{ item.price }}
          </p>
          <div class="text-end">
            <BLink
              href="javascript:void(0);"
              class="btn whb-red-bg text-uppercase fs-16 text-white w-100"
              >Add to cart</BLink
            >
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const router = useRouter();

    const viewProduct = (slug) => {
      router.push({ name: 'product-show', params: { slug } });
    };

    return {
      viewProduct,
    };
  },
};
</script>
