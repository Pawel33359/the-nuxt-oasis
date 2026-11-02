import type { Component } from "vue";

export const useModal = () => {
  const modal = useState<{
    component: Component;
    props?: Record<string, unknown>;
  } | null>("modal", () => null);

  const openModal = (component: Component, props = {}) => {
    modal.value = { component, props };
  };

  const closeModal = () => {
    modal.value = null;
  };

  return { modal, openModal, closeModal };
};
