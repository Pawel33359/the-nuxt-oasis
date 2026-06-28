<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <header :class="`header ${route.name === 'index' ? '--main' : ''}`">
    <div class="header__container">
      <Logo />
      <Navigation />
    </div>
  </header>
</template>
<style scoped>
.header {
  position: relative;
  padding: var(--space-5) var(--space-8);
  max-width: var(--page-mw);
  margin: 0 auto;
}
.header::after {
  content: "";
  display: block;
  position: absolute;
  width: 100vw;
  height: 1px;
  background: var(--text-muted);
  z-index: 11;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}
.header.--main {
  opacity: 0.2;
  transform: translateY(-50%);
  animation: header-show forwards var(--animation-md);
}
.header.--main::after {
  content: none !important;
}
.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--page-mw);
}
@keyframes header-show {
  from {
    opacity: 0.2;
    transform: translateY(-50%);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
