<template>
  <LayoutView>
    <LoaderView v-if="isLoading" />
    <BCol
      xxl="5"
      sm="6"
      class="w-100 p-5"
      v-else
    >
      <BCol
        lg="12"
        class="mb-2 mt-4 d-flex flex-column flex-xl-row gap-3"
        v-if="userCartItems.length > 0"
      >
        <div class="w-100 table-container">
          <div class="table-responsive table-card mb-2">
            <table class="table table-nowrap">
              <thead>
                <tr class="text-uppercase">
                  <th></th>
                  <th></th>
                  <th class="fw-bold">Product</th>
                  <th class="fw-bold">Price</th>
                  <th class="fw-bold">Quantity</th>
                  <th class="fw-bold">Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in userCartItems"
                  :key="item.id"
                  class="align-middle"
                >
                  <td @click="deleteCartItem(item.id)">
                    <i class="ri-close-line fs-24 cursor-pointer"></i>
                  </td>
                  <td>
                    <img
                      :src="item.product.image_url"
                      class="rounded object-fit-cover"
                    />
                  </td>
                  <td>{{ item.product.name }}</td>
                  <td>$ {{ item.product.price }}</td>
                  <td>
                    <ProductQuantityControl
                      :quantity="item.quantity"
                      :index="index"
                      @update="updateQuantity"
                    />
                  </td>
                  <td>$ {{ item.product.price * item.quantity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-end w-100 mb-2">
            <button
              :disabled="!isUpdated"
              type="button"
              class="text-uppercase btn btn-outline-secondary"
              @click="updateCart"
            >
              Update my Cart
            </button>
          </div>
        </div>

        <div class="gray-border p-3 mx-auto w-100 cart-total-container">
          <h2 class="fw-bold">Cart Total</h2>
          <div class="d-flex justify-content-between">
            <p class="fw-bold">Products</p>
            <p class="fw-bold">
              $
              {{ cartItemsTotal }}
            </p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="fw-bold">tax</p>
            <p class="fw-bold">${{ tax }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="fw-bold">shipping</p>
            <p class="fw-bold">${{ shippingCost }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="fw-bold">Total</p>
            <p class="fw-bold">${{ cartItemsTotal + tax + shippingCost }}</p>
          </div>
          <div>
            <button
              type="button"
              class="text-uppercase btn btn-danger w-100"
              @click="toggleCheckoutModal"
            >
              checkout
            </button>
          </div>
        </div>
      </BCol>
      <BCol
        lg="12"
        class="mb-2 mt-4 mx-5 d-flex"
        v-else
      >
        <div class="w-100 d-flex justify-content-center">
          <span class="text-uppercase fs-16 fw-bold red-top-border"
            >Your Cart is empty.</span
          >
        </div>
      </BCol>
    </BCol>
    <CheckOutModal
      v-model:showModal="showCheckoutModal"
      v-model:confirmAction="storeOrder"
    />
  </LayoutView>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue';
import { useToast } from 'vue-toastification';
import { useUserStore, useCartStore, useOrderStore } from '@/state';
import {
  LayoutView,
  ProductQuantityControl,
  LoaderView,
  CheckOutModal,
} from '@/components';

import { openConfirmModal } from '@/utils/pagesUtils';

export default {
  name: 'UserCart',
  components: { LayoutView, ProductQuantityControl, LoaderView, CheckOutModal },

  setup() {
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const orderStore = useOrderStore();
    const isLoading = ref(false);
    const toast = useToast();
    const storeUserCartItems = computed(() => userStore.user.cart_items);
    const userCartItems = ref([]);
    const tax = ref(10);
    const shippingCost = ref(50);
    const cartItemsTotal = computed(() => userStore.user.cart_items_price);
    const showCheckoutModal = ref(false);
    const cartIsUpdated = ref(false);
    const isUpdated = computed(() => cartIsUpdated.value);

    const setUserCartItems = () => {
      userCartItems.value = JSON.parse(
        JSON.stringify(storeUserCartItems.value),
      );
    };

    const fetchUserCartData = async () => {
      isLoading.value = true;
      await userStore.fetchUserActiveCartItems(userStore.user.id);
      await userStore.calculateTotalPrice();
      setUserCartItems();

      isLoading.value = false;
    };

    const toggleCheckoutModal = () => {
      showCheckoutModal.value = true;
    };

    const deleteCartItem = async (id) => {
      const result = await cartStore.deleteCartItem(id);
      if (result.status === 200) {
        const response = await userStore.fetchUserActiveCartItems(
          userStore.user.id,
        );
        await userStore.calculateTotalPrice();
        setUserCartItems();
        if (response.status !== 200) toast.error(response.data.message);
      }
      result.status !== 200
        ? toast.error(result.data.message)
        : toast.success(result.data.message);
    };

    const storeOrder = async () => {
      const products = userCartItems.value.map((item) => {
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product.price,
        };
      });
      const cart_id = userCartItems.value[0].cart_id;

      const response = await orderStore.storeOrder({
        user_id: userStore.user.id,
        cart_id,
        products,
        shipping_fee: shippingCost.value,
        tax: tax.value,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message);
        await fetchUserCartData();
      } else {
        toast.error(response.data.message);
      }
    };

    const updateQuantity = (index, value) => {
      if (value < 1) {
        return;
      }
      userCartItems.value[index].quantity = value;
      if (!cartIsUpdated.value) cartIsUpdated.value = true;
    };

    const updateCart = async () => {
      for (let i = 0; i < userCartItems.value.length; i++) {
        if (
          userCartItems.value[i].quantity !==
          userStore.user.cart_items[i].quantity
        ) {
          const data = {
            id: userCartItems.value[i].id,
            quantity: userCartItems.value[i].quantity,
            product_id: userCartItems.value[i].product_id,
            cart_id: userCartItems.value[i].cart_id,
            user_id: userStore.user.id,
          };

          isLoading.value = true;
          const result = await cartStore.updateItemCartQuantity(data);
          if (result.status === 200) {
            const response = await userStore.fetchUserActiveCartItems(
              data.user_id,
            );
            await userStore.calculateTotalPrice();
            if (response.status !== 200) toast.error(response.data.message);
          }
          cartIsUpdated.value = false;
          result.status !== 200
            ? toast.error(result.data.message)
            : toast.success(result.data.message);
          isLoading.value = false;
        }
      }
    };

    onBeforeMount(async () => {
      await fetchUserCartData();
    });

    return {
      userCartItems,
      updateQuantity,
      isUpdated,
      updateCart,
      deleteCartItem,
      isLoading,
      tax,
      shippingCost,
      cartItemsTotal,
      storeOrder,
      toggleCheckoutModal,
      showCheckoutModal,
      openConfirmModal,
    };
  },
};
</script>

<style scoped>
td img {
  width: 75px;
  height: 75px;
}
@media (min-width: 1200px) {
  table {
    white-space: nowrap !important;
  }
  .table-container {
    max-width: 75% !important;
  }
  .cart-total-container {
    max-width: 25% !important;
  }
}
</style>
