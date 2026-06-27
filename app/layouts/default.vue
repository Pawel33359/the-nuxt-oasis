<script setup lang="ts"></script>
<template>
  <div class="layout">
    <Header />
    <div class="container">
      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>
<style>
.container {
  flex: 1 1 0%;
  padding: var(--space-8) var(--space-5);
  display: grid;
}
.content {
  max-width: var(--page-mw);
  margin: 0 auto;
  width: 100%;
}
</style>
