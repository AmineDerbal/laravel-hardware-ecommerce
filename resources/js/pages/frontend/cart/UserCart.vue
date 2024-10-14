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
                v-for="item in userCartItems"
                :key="item.id"
              >
                <td>Ok</td>
                <td>
                  <img
                    :src="item.product.image_url"
                    class="img-fluid w-25"
                  />
                </td>
                <td>{{ item.product.name }}</td>
                <td>{{ item.product.price }}</td>
                <td>{{ item.quantity }}</td>
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
import { computed } from 'vue';
import { LayoutView } from '@/components';
import { useUserStore } from '@/state';
import { ProductQuantityControl } from '@/components';

export default {
  name: 'UserCart',
  components: { LayoutView },

  setup() {
    const userStore = useUserStore();
    const userCartItems = computed(() => userStore.user.cart_items);
    console.log(userCartItems.value);
    return { userCartItems };
  },
};
</script>
