<script setup lang="ts"></script>

<template>
  <NuxtLink to="/" class="logo">
    <NuxtImg
      class="logo__img"
      width="60"
      height="0"
      src="/logo.png"
      alt="The
    Nuxt Oasis logo"
      :modifiers="{ tint: '#2f855a' }"
    />
    <span class="logo__text">The Nuxt Oasis</span>
  </NuxtLink>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  z-index: 10;
  position: relative;
  color: var(--text);
  text-decoration: none;
}
.logo__img {
}
.logo__text {
  font-size: var(--text-xl);
  font-weight: 600;
}
</style>
