import type { Component } from "vue";

/*
Add option for timer to help close the animation
*/
export const useModal = () => {
  const modal = useState<{
    component: Component;
    props?: Record<string, unknown>;
  } | null>("modal", () => null);

  const openModal = (component: Component, props = {}) => {
    modal.value = { component: markRaw(component), props };
  };

  const closeModal = () => {
    modal.value = null;
  };

  return { modal, openModal, closeModal };
};
