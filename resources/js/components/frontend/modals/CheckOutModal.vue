<template>
  <BModal
    title="Check Out"
    class="v-modal-custom"
    v-model="showModal"
  >
  </BModal>
  <BRow class="g-3">
    <BCol xxl="12">
      <p class="text-muted">Are you sure you want to checkout?</p>
    </BCol>
    <BCol lg="12">
      <div class="hstack gap-2 justify-content-end">
        <BButton
          type="button"
          variant="danger"
          @click="closeShowModal"
          >Cancel</BButton
        >
        <BButton
          type="button"
          variant="primary"
          @click="onConfirm"
          >Confirm</BButton
        >
      </div>
    </BCol>
  </BRow>
</template>

<script>
export default {
  name: 'CheckOutModal',

  props: {
    showModal: {
      type: Boolean,
      required: true,
      default: false,
    },
    confirmAction: {
      type: Function,
      required: true,
      default: () => {},
    },
  },

  setup(props, { emit }) {
    const show = computed(() => props.showModal);

    const closeShowModal = () => {
      emit('update:showModal', false);
      emit('update:confirmAction', () => {});
    };

    return {
      show,
      closeShowModal,
    };
  },
};
</script>
