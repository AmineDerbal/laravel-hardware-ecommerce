<template>
  <LayoutView>
    <BRow class="justify-content-center">
      <BCol
        md="8"
        lg="6"
        xl="5"
      >
        <BCard
          no-body
          class="mt-4"
        >
          <BCardBody class="p-4">
            <div class="text-center mt-2">
              <h5 class="text-primary">Welcome!</h5>
              <p class="text-muted">
                Login to continue toward Admin Dashboard for Hardware Commerce.
              </p>
            </div>
            <div class="p-2 mt-4">
              <span
                class="text-danger"
                v-if="errors.message"
                >{{ errors.message }}</span
              >
              <b-alert
                v-model="authError"
                variant="danger"
                class="mt-3"
                dismissible
                >{{ authError }}</b-alert
              >

              <div></div>

              <form @submit.prevent="tryToLogIn">
                <div class="mb-3">
                  <label
                    for="email"
                    class="form-label"
                    >Email</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    v-model="email"
                  />
                  <div class="invalid-feedback">
                    <span></span>
                  </div>
                </div>

                <div class="mb-3">
                  <div class="float-end">
                    <router-link
                      to="/forgot-password"
                      class="text-muted"
                      >Forget password?</router-link
                    >
                  </div>
                  <label
                    class="form-label"
                    for="password-input"
                    >Password</label
                  >
                  <div class="position-relative auth-pass-inputgroup mb-3">
                    <input
                      v-model="password"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control pe-5"
                      placeholder="Enter password"
                      id="password-input"
                    />
                    <BButton
                      variant="link"
                      class="position-absolute end-0 top-0 text-decoration-none text-muted"
                      type="button"
                      id="password-addon"
                      @click="togglePasswordVisibility"
                    >
                      <i
                        :class="[
                          showPassword ? 'ri-eye-off-fill' : 'ri-eye-fill',
                          'align-middle',
                        ]"
                      ></i>
                    </BButton>
                    <div class="invalid-feedback">
                      <span></span>
                    </div>
                  </div>
                </div>
                <div class="mt-4">
                  <BButton
                    variant="success"
                    class="w-100"
                    type="submit"
                    @click="handleSubmit"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? 'Wait Please' : 'Login' }}
                  </BButton>
                </div>
              </form>
            </div>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
  </LayoutView>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { LayoutView } from '@/components';
import { useUserStore } from '@/state';

export default {
  name: 'LoginView',
  components: { LayoutView },
  beforeCreate() {
    const userStore = useUserStore();
    if (userStore.user.isAuthenticated) {
      this.$router.push({ name: 'home' });
    }
  },

  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const email = ref('admin@gmail.com');
    const password = ref('admin123');
    const showPassword = ref(false);
    const user = computed(() => userStore.user);
    const isLoading = computed(() => userStore.isLoading);
    const errors = computed(() => userStore.errors);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const checkIsAuthenticated = () => {
      return user.value.isAuthenticated &&
        user.value.name &&
        user.value.email === email.value
        ? true
        : false;
    };

    const handleSubmit = async () => {
      await userStore.loginUser({
        email: email.value,
        password: password.value,
      });
      if (checkIsAuthenticated()) {
        router.push({ name: 'home' });
      }
    };

    return {
      email,
      password,
      showPassword,
      togglePasswordVisibility,
      handleSubmit,
      isLoading,
      errors,
    };
  },
};
</script>
