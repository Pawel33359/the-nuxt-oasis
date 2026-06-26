<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="header__container">
      <Logo />
      <Navigation />
    </div>
  </header>
</template>
<style scoped>
.header {
  border-bottom: 1px solid var(--bg-soft);
  padding: var(--space-5) var(--space-8);
}
.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--page-mw);
}
</style>
