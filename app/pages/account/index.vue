<script setup lang="ts">
import { auth } from "~/middleware/auth";

definePageMeta({
  layout: "side-navigation",
  middleware: auth,
});

useSeoMeta({
  title: "Account",
});

const { data: session } = useAuth();
</script>

<template>
  <section class="account-welcome">
    <h1 class="account-welcome-title" v-if="session?.user">
      Welcome back, {{ session.user.name }}.
    </h1>
    <p v-else>Loading your session…</p>
  </section>
</template>

<style scoped>
.account-welcome {
  /* width: min(100%, 48rem); */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  /* border: 1px solid var(--border); */
  border-radius: 1rem;
}
.account-welcome-title {
  margin: 0;
  text-align: start;
}
.account-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
