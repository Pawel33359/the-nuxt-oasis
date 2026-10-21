<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const route = useRoute();

const headerRef = ref<HTMLElement | null>(null);
let observer: ResizeObserver | undefined;

onMounted(() => {
  if (!headerRef.value) return;

  const updateHeight = () => {
    document.documentElement.style.setProperty(
      "--header-height",
      `${headerRef?.value?.offsetHeight ?? 0}px`
    );
  };

  observer = new ResizeObserver(updateHeight);
  observer.observe(headerRef?.value);
  updateHeight();
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <header
    :class="`header ${route.name === 'index' ? '--main' : ''}`"
    ref="headerRef"
  >
    <div class="header__container">
      <Logo />
      <Navigation />
    </div>
  </header>
</template>
<style scoped>
.header {
  /* position: relative; */
  padding: var(--space-5) var(--space-8);
  max-width: var(--page-mw);
  margin: 0 auto;

  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg);
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
header.--main {
  background: transparent;
}
@media (min-width: 979px) {
  .header.--main {
    opacity: 0.2;
    transform: translateY(-50%);
    animation: header-show forwards var(--animation-md);
  }
  .header.--main::after {
    content: none !important;
  }
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
