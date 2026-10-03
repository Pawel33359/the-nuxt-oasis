<script setup lang="ts"></script>
<template>
  <div class="layout">
    <Header />
    <div class="container">
      <main class="content --side-navigation">
        <SideNavigation />
        <slot />
      </main>
    </div>
  </div>
</template>
<style scoped>
.content.--side-navigation {
  display: grid;
  grid-template-columns: minmax(16rem, 20rem) 1fr;
  gap: var(--space-8);
}
</style>
