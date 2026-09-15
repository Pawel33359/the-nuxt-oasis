<script setup lang="ts">
import { ref } from "vue";

const { signOut } = useAuth();
const isSigningOut = ref(false);

async function handleSignOut() {
  if (isSigningOut.value) {
    return;
  }

  isSigningOut.value = true;

  try {
    await signOut({ callbackUrl: "/" });
  } finally {
    isSigningOut.value = false;
  }
}
</script>

<template>
  <button
    class="btn"
    type="button"
    @click="handleSignOut"
    :disabled="isSigningOut"
  >
    <span v-if="!isSigningOut">Sign out</span>
    <span v-else>Signing out…</span>
  </button>
</template>

<style scoped>
/* .sign-out-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.25rem;
  border: 1px solid var(--primary-300);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.sign-out-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.sign-out-button:hover:not(:disabled) {
  background-color: var(--primary-100);
} */
</style>
