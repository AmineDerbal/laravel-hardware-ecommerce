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
                Please create an account to use Hardware Commerce.
              </p>
            </div>
            <div class="p-2 mt-4">
              <form @submit.prevent="tryToLogIn">
                <div class="mb-3">
                  <label
                    for="name"
                    class="form-label"
                    >Name</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Enter name"
                    v-model="name"
                  />

                  <span
                    class="text-danger"
                    v-if="errors.name && errors.name[0]"
                  >
                    {{ errors.name[0] }}
                  </span>
                </div>
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

                  <span
                    class="text-danger"
                    v-if="errors.email && errors.email[0]"
                  >
                    {{ errors.email[0] }}
                  </span>
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
                      @click="togglePasswordVisibility(1)"
                    >
                      <i
                        :class="[
                          showPassword ? 'ri-eye-off-fill' : 'ri-eye-fill',
                          'align-middle',
                        ]"
                      ></i>
                    </BButton>
                    <span
                      class="text-danger"
                      v-if="errors.password && errors.password[0]"
                    >
                      {{ errors.password[0] }}
                    </span>
                  </div>
                </div>
                <div class="mb-3">
                  <label
                    class="form-label"
                    for="password-input"
                    >Confirm Password</label
                  >
                  <div class="position-relative auth-pass-inputgroup mb-3">
                    <input
                      v-model="password_confirmation"
                      :type="showPasswordConfirmation ? 'text' : 'password'"
                      class="form-control pe-5"
                      placeholder="Confirm password"
                      id="password-input"
                    />
                    <BButton
                      variant="link"
                      class="position-absolute end-0 top-0 text-decoration-none text-muted"
                      type="button"
                      id="password-addon"
                      @click="togglePasswordVisibility(2)"
                    >
                      <i
                        :class="[
                          showPasswordConfirmation
                            ? 'ri-eye-off-fill'
                            : 'ri-eye-fill',
                          'align-middle',
                        ]"
                      ></i>
                    </BButton>
                    <span
                      class="text-danger"
                      v-if="
                        errors.password_confirmation &&
                        errors.password_confirmation[0]
                      "
                    >
                      {{ errors.password_confirmation[0] }}
                    </span>
                  </div>
                </div>
                <div class="mt-4">
                  <BButton
                    class="w-100 whb-red-bg border-0"
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
import { useToast } from 'vue-toastification';
import { LayoutView } from '@/components';
import { useUserStore } from '@/state';
import { handleRegisterSubmit } from '@/utils/authUtils';

export default {
  name: 'RegisterView',
  components: { LayoutView },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const toast = useToast();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const password_confirmation = ref('');
    const showPassword = ref(false);
    const showPasswordConfirmation = ref(false);
    const isLoading = computed(() => userStore.isLoading);
    const errors = computed(() => userStore.errors);

    const togglePasswordVisibility = (number) => {
      switch (number) {
        case 1:
          showPassword.value = !showPassword.value;
          break;
        case 2:
          showPasswordConfirmation.value = !showPasswordConfirmation.value;
          break;
        default:
          break;
      }
    };

    const handleSubmit = async () => {
      const response = await handleRegisterSubmit(userStore, {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message, { timeout: 2000 });
        router.push({ name: 'login' });
      }
    };

    return {
      name,
      email,
      password,
      password_confirmation,
      showPassword,
      showPasswordConfirmation,
      isLoading,
      errors,
      togglePasswordVisibility,
      handleSubmit,
    };
  },
};
</script>
