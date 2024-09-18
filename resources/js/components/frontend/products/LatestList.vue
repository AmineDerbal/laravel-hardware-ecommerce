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
            <button
              type="button"
              class="btn btn-outline-danger btn-load whb-red-bg text-uppercase fs-16 text-white w-100"
              @click="handleAddToCartBtnClick(item.id)"
            >
              <span class="d-flex align-items-center justify-content-center">
                <span
                  class="spinner-border flex-shrink-0"
                  role="status"
                  v-if="isLoading[item.id]"
                >
                </span>
                <span
                  class="flex-frow-1 ms-2"
                  v-else
                  >Add to cart
                </span>
              </span>
            </button>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useCartStore, useUserStore } from '@/state';

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const router = useRouter();
    const cartStore = useCartStore();
    const userStore = useUserStore();
    const toast = useToast();

    const user = computed(() => userStore.user);
    const isLoading = ref({});

    const isUserLoggedIn = computed(() =>
      user.value.isAuthenticated && user.value.name && user.value.email
        ? true
        : false,
    );

    const handleAddToCartBtnClick = async (product_id) => {
      if (!isUserLoggedIn.value) {
        toast.error('Please login to add product to cart');
        return;
      }

      const { id, cart_id } = userStore.checkIfItemIsInCart(product_id) || {};

      const item = {
        user_id: user.value.id,
        product_id,
        quantity: 1,
        id,
        cart_id,
      };

      isLoading.value = { ...isLoading.value, [product_id]: true };
      const result = await cartStore.addItemToCart(item);
      if (result.status !== 200) {
        isLoading.value = { ...isLoading.value, [product_id]: false };
        toast.error(result.data.message);
        return;
      }
      const response = await userStore.fetchUserActiveCartItems(user.value.id);
      if (response.status !== 200) {
        toast.error(response.data.message);
        return;
      }

      toast.success(result.data.message);

      isLoading.value = { ...isLoading.value, [product_id]: false };
    };

    const viewProduct = (slug) => {
      router.push({ name: 'product-show', params: { slug } });
    };

    return {
      viewProduct,
      isUserLoggedIn,
      isLoading,
      handleAddToCartBtnClick,
    };
  },
};
</script>
