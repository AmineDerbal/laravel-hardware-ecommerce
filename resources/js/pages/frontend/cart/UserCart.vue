<template>
  <LayoutView>
    <BCol
      xxl="5"
      sm="6"
      class="w-100 p-5"
    >
      <BCol
        lg="12"
        class="mb-2 mt-4"
      >
        <div class="table-responsive table-card mb-2">
          <table class="table table-nowrap">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
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
                <td>{{ item.product.price }}</td>
                <td>
                  <ProductQuantityControl
                    :quantity="item.quantity"
                    :index="index"
                    @update="updateQuantity"
                  />
                </td>
                <td>{{ item.product.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </BCol>
    </BCol>
  </LayoutView>
</template>

<script>
import { ref } from 'vue';
import { LayoutView } from '@/components';
import { useUserStore } from '@/state';
import { ProductQuantityControl } from '@/components';

export default {
  name: 'UserCart',
  components: { LayoutView, ProductQuantityControl },

  setup() {
    const userStore = useUserStore();
    const userCartItems = ref([...(userStore.user.cart_items || [])]);
    const cartIsUpdated = ref(false);

    const updateQuantity = (index, value) => {
      if (value < 1) {
        return;
      }
      userCartItems.value[index].quantity = value;
      cartIsUpdated.value = true;
    };

    return { userCartItems, updateQuantity };
  },
};
</script>

<style scoped>
td img {
  width: 75px;
  height: 75px;
}
</style>
