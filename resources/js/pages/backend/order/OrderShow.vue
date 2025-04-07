<template>
  <AdminLayoutView>
    <LoaderView v-if="isLoading" />
    <div v-else>
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">Order Details</h6>
          <div class="table-responsive">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td>Code</td>
                  <td>
                    <code>{{ order.code }}</code>
                  </td>
                </tr>
                <tr>
                  <td>Customer</td>
                  <td>
                    <code>{{ order.user.name }}</code>
                  </td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>
                    <code>{{
                      new Date(order.created_at).toLocaleString()
                    }}</code>
                  </td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    <code>{{ order.status_label }}</code>
                  </td>
                </tr>
                <tr>
                  <td>Total Price</td>
                  <td>
                    <code>$ {{ order.total_amount }} $</code>
                  </td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>
                    <code>$ {{ order.tax }} $</code>
                  </td>
                </tr>
                <tr>
                  <td>Shipping Cost</td>
                  <td>
                    <code>$ {{ order.shipping_fee }} $</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h6 class="card-title">Order Items</h6>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in order.items"
                    :key="item.id"
                  >
                    <td>{{ item.name }}</td>
                    <td>$ {{ item.price }}</td>
                    <td>{{ item.quantity }} Unit</td>
                    <td>$ {{ item.total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayoutView>
</template>

<script>
import { computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { AdminLayoutView, LoaderView } from '@/components';
import { useOrderStore } from '@/state';

export default {
  components: { AdminLayoutView, LoaderView },

  setup() {
    const orderStore = useOrderStore();
    const route = useRoute();
    const order = computed(() => orderStore.order);
    const isLoading = computed(() => orderStore.isLoading);

    onBeforeMount(async () => {
      await orderStore.getOrder(route.params.id);
    });

    return {
      order,
      isLoading,
    };
  },
};
</script>
