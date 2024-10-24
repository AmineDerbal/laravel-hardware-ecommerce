<template>
  <LayoutView>
    <BCol
      xxl="5"
      sm="6"
      class="w-100 p-5"
    >
      <BCol
        lg="12"
        class="mb-2 mt-4 mx-5 d-flex"
      >
        <div class="mx-5 w-75">
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
                  <td><i class="ri-close-line fs-24 cursor-pointer"></i></td>
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
          <div class="d-flex justify-content-end w-100">
            <button
              :disabled="!isUpdated"
              type="button"
              @click="updateCart"
            >
              Update Cart
            </button>
          </div>
        </div>

        <div class="gray-border w-25 p-3">
          <p>Cart Total</p>
        </div>
      </BCol>
    </BCol>
  </LayoutView>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue';
import { useToast } from 'vue-toastification';
import { useUserStore, useCartStore } from '@/state';
import { LayoutView, ProductQuantityControl } from '@/components';

export default {
  name: 'UserCart',
  components: { LayoutView, ProductQuantityControl },

  setup() {
    const userStore = useUserStore();
    const cartStore = useCartStore();
    const toast = useToast();
    const originalUserCartItems = computed(() => userStore.user.cart_items);
    const userCartItems = ref([]);

    const setUserCartItems = () => {
      userCartItems.value = JSON.parse(
        JSON.stringify(originalUserCartItems.value),
      );
    };

    const cartIsUpdated = ref(false);
    const isUpdated = computed(() => cartIsUpdated.value);

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

          const result = await cartStore.updateItemCartQuantity(data);
          if (result.status === 200) {
            const response = await userStore.fetchUserActiveCartItems(
              data.user_id,
            );
            if (response.status !== 200) toast.error(response.data.message);
          }
          result.status !== 200
            ? toast.error(result.data.message)
            : toast.success(result.data.message);
        }
      }
    };

    onBeforeMount(() => {
      setUserCartItems();
      console.log(userCartItems.value);
    });

    return { userCartItems, updateQuantity, isUpdated, updateCart };
  },
};
</script>

<style scoped>
td img {
  width: 75px;
  height: 75px;
}
</style>
