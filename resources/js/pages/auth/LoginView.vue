<script>
import { useUserStore } from '@/state';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

export default {
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

    const handleSubmit = async () => {
      await userStore.loginUser({
        email: email.value,
        password: password.value,
      });
      if (
        user.value.isAuthenticated &&
        user.value.name &&
        user.value.email === email.value
      ) {
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

<template>
  <div class="auth-page-wrapper pt-5">
    <div
      class="auth-one-bg-position auth-one-bg"
      id="auth-particles"
    >
      <div class="bg-overlay"></div>

      <div class="shape">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
          ></path>
        </svg>
      </div>
    </div>

    <div class="auth-page-content">
      <BContainer>
        <BRow>
          <BCol lg="12">
            <div class="text-center mt-sm-5 mb-4 text-white-50">
              <div>
                <router-link
                  to="/"
                  class="d-inline-block auth-logo"
                >
                  <img
                    src="@/assets/images/logo.png"
                    alt=""
                    height="50"
                  />
                  <span class="text-light fw-bold ms-2">Hardware</span>
                </router-link>
              </div>
              <p class="mt-3 fs-15 fw-bold">Hardware Commerce</p>
            </div>
          </BCol>
        </BRow>

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
                    Login to continue toward Admin Dashboard for Hardware
                    Commerce.
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
      </BContainer>
    </div>
  </div>
</template>
