<script setup lang="ts">
import { auth } from "~/middleware/auth";

definePageMeta({
  layout: "default",
  middleware: auth,
});

useSeoMeta({
  title: "Account",
});

const { data: session } = useAuth();
</script>

<template>
  <main class="page-shell">
    <section class="account-welcome">
      <h1>Guest area</h1>
      <p v-if="session?.user">Welcome back, {{ session.user.name }}.</p>
      <p v-else>Loading your session…</p>
      <div class="account-actions">
        <NuxtLink class="btn" to="/account/profile">Profile</NuxtLink>
        <NuxtLink class="btn" to="/account/reservations">Reservations</NuxtLink>
        <SignOutButton />
      </div>
    </section>
  </main>
</template>

<style scoped>
.page-shell {
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
}
.account-welcome {
  width: min(100%, 48rem);
  display: grid;
  gap: 1.5rem;
  padding: 2rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--surface);
}
.account-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
