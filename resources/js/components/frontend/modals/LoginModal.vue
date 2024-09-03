<template>
  <div
    class="d-flex justify-content-end w-100 h-100 top-0 left-0 login-menu-modal position-fixed overflow-hidden"
    @click="setShowLoginModal"
  >
    <div
      class="w-25 h-100 position-relative bg-white overflow-auto login-menu"
      @click.stop
    >
      <div class="d-flex justify-content-between align-items-center mt-3 mx-2">
        <p class="fw-semibold mb-0 ms-5 fs-18">Sign in</p>
        <span
          class="fw-semibold ms-1 d-flex align-items-center cursor-pointer"
          style="cursor: pointer"
          @click="setShowLoginModal"
        >
          <i class="ri-close-line fs-24"></i>
          Close</span
        >
      </div>
      <div class="w-100 gray-bottom-border mt-3"></div>
      <BContainer>
        <BCardBody class="py-4 px-2">
          <form @submit.prevent>
            <div class="mb-3">
              <label
                for="email"
                class="form-label"
                >Email <span class="text-danger">*</span></label
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
                >Password <span class="text-danger">*</span></label
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
                class="w-100 whb-red-bg"
                type="submit"
                @click="handleSubmit"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Wait Please' : 'Login' }}
              </BButton>
            </div>
          </form>
        </BCardBody>
      </BContainer>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { handleLoginSubmit } from '@/utils/authUtils';
export default {
  name: 'LoginModal',
  props: {
    userStore: {
      type: Object,
      required: true,
    },
  },

  // methods: {
  //   setShowLoginModal() {
  //     this.$emit('setShowLoginModal', false);
  //   },
  // },

  setup(props, { emit }) {
    const router = useRouter();
    const email = ref('admin@gmail.com');
    const password = ref('admin123');
    const showPassword = ref(false);
    const isLoading = computed(() => props.userStore.isLoading);
    const errors = computed(() => props.userStore.errors);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const setShowLoginModal = () => {
      emit('setShowLoginModal', false);
    };
    const handleSubmit = async () => {
      const result = await handleLoginSubmit(
        props.userStore,
        email.value,
        password.value,
      );

      if (result) {
        setShowLoginModal();
        router.push({ name: 'home' });
      }
    };

    return {
      email,
      password,
      showPassword,
      togglePasswordVisibility,
      handleSubmit,
      errors,
      isLoading,
      setShowLoginModal,
    };
  },
};
</script>

<style scoped>
.login-menu-modal {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.login-menu {
  min-width: 200px;
}
</style>
