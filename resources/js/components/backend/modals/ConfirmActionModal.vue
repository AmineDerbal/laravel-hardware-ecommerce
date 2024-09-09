<template>
  <BModal
    title="Confirm Action"
    class="v-modal-custom"
    v-model="show"
    @hide="closeShowModal"
    :key="show"
    hide-footer
  >
    <BRow class="g-3">
      <BCol xxl="12">
        <p class="text-muted">Are you sure you want to perform this action?</p>
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
  </BModal>
</template>

<script>
import { computed } from 'vue';
export default {
  name: 'ConfirmActionModal',

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

    const onConfirm = async () => {
      try {
        await props.confirmAction();
        closeShowModal();
      } catch (error) {
        return;
      }
    };

    return {
      show,
      closeShowModal,
      onConfirm,
    };
  },
};
</script>
