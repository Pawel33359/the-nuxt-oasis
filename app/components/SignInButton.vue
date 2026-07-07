<script setup lang="ts">
import { ref } from "vue";

const router = useRouter();
const isSubmitting = ref(false);

async function handleSignIn() {
  if (isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;

  try {
    await $fetch("/api/auth/signin", {
      method: "POST",
    });
    await router.push("/account");
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
    <span v-if="!isSubmitting">Continue with Google</span>
    <span v-else>Signing in…</span>
  </button>
</template>

<style scoped>
.sign-in-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem;
  border: 1px solid var(--primary-300);
  color: var(--text);
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.sign-in-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.sign-in-button:hover:not(:disabled) {
  background-color: var(--primary-100);
}
</style>
