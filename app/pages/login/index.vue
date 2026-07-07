<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: "Login",
});
</script>

<template>
  <main class="page-shell">
    <section class="login-panel">
      <h1>Sign in to access your guest area</h1>
      <p>Use the guest login to view and manage your reservations.</p>
      <SignInButton />
    </section>
  </main>
</template>

<style scoped>
.page-shell {
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
}
.login-panel {
  width: min(100%, 36rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--surface);
}
.login-panel h1 {
  font-size: clamp(2rem, 2.5vw, 2.75rem);
  margin: 0;
}
.login-panel p {
  margin: 0;
  color: var(--text-muted);
}
</style>
