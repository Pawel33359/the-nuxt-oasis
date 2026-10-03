<script setup lang="ts">
import { ref } from "vue";

const { signIn } = useAuth();
const isSubmitting = ref(false);

async function handleSignIn() {
  if (isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    await signIn("google", { callbackUrl: "/account" });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <button
    class="sign-in-button"
    type="button"
    @click="handleSignIn"
    :disabled="isSubmitting"
  >
    <img class="google-logo" src="/google.svg" alt="" />
    <span v-if="!isSubmitting">Continue with Google</span>
    <span v-else>Signing in…</span>
  </button>
</template>

<style scoped>
.sign-in-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 3rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid #dadce0;
  border-radius: 0.25rem;
  color: #3c4043;
  background: #fff;
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: box-shadow 0.2s ease, background-color 0.2s ease;
}
.google-logo {
  width: 1.25rem;
  height: 1.25rem;
}
.sign-in-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.sign-in-button:hover:not(:disabled) {
  background-color: #f8faff;
  box-shadow: 0 1px 3px rgb(60 64 67 / 30%);
}
</style>
