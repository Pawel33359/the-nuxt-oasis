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
    class="btn --outline sign-out-button"
    type="button"
    @click="handleSignOut"
    :disabled="isSigningOut"
  >
    <Icon name="heroicons:arrow-right-on-rectangle-20-solid" />
    <span v-if="!isSigningOut">Sign out</span>
    <span v-else>Signing out…</span>
  </button>
</template>

<style scoped>
.sign-out-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}
</style>
