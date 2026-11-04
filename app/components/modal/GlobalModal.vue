<script setup lang="ts">
const { modal, closeModal } = useModal();

const dialog = ref<HTMLDialogElement | null>(null);

watch(
  modal,
  (value) => {
    if (value && !dialog.value?.open) {
      dialog.value?.showModal();
    } else if (!value && dialog.value?.open) {
      dialog.value.close();
    }
  },
  { flush: "post" }
);

function handleClose() {
  if (modal.value) {
    closeModal();
  }
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === dialog.value) {
    closeModal();
  }
}
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="modal"
      @close="handleClose"
      @click="handleBackdropClick"
      v-if="modal?.component"
    >
      <button class="modal_close" @click="handleClose">
        <Icon name="heroicons:x-mark-20-solid" size="24" />
      </button>
      <div class="modal_content">
        <component v-if="modal" :is="modal.component" v-bind="modal.props" />
      </div>
    </dialog>
  </Teleport>
</template>
<style scoped>
.modal {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 0;
  max-width: 100vw;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  border-radius: var(--radius-md);
}
.modal_close {
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  border-radius: 50%;
  aspect-ratio: 1/1;
  display: flex;
  transition: all var(--transition-sm);
  padding: 0.4rem;
  z-index: 2;
  background: #fff;
}
.modal_close:hover {
  background: var(--bg-light);
}
.modal_content {
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;
}

/* Disabled for now - doesnt work when modal dissapears */
/* @supports (transition-behavior: allow-discrete) {
  .modal {
    --modal-transition-time: var(--transition-lg);

    opacity: 0;
    scale: 0.5;

    transition: opacity var(--modal-transition-time),
      scale var(--modal-transition-time),
      display var(--modal-transition-time) allow-discrete;

    transform-origin: center center;
  }

  .modal:open {
    opacity: 1;
    scale: 1;
    display: block;

    @starting-style {
      opacity: 0;
      scale: 0.5;
    }
  }
} */
</style>
