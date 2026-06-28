<script setup lang="ts"></script>

<template>
  <NuxtImg
    src="/bg.png"
    alt="Mountains and forests with two cabins"
    class="hero__img"
    format="webp"
    width="3000"
    height="2000"
    quality="80"
    sizes="sm:100vw md:100vw lg:100vw"
    loading="eager"
    fit="cover"
    placeholder
  />
  <div class="home">
    <h1 class="home__title">Welcome to paradise.</h1>
    <NuxtLink class="btn --xl home__btn" to="/cabins">
      <span>Explore luxury cabins</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-5);
  padding-top: var(--space-16);
}
.home__title {
  color: var(--text);
  font-size: var(--text-10xl);
  filter: drop-shadow(0 0 5px var(--bg));
}
.hero__img {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  animation: hero-show forwards var(--animation-lg);
}
.home__btn {
  overflow: hidden;
}
.home__btn span {
  display: block;
  transition: all var(--transition-md);
}
.home__btn:hover span {
  scale: 1.05;
}
@keyframes img-start-zoom {
  from {
    scale: 1.3;
    opacity: 0.8;
  }
  to {
    scale: 1;
    opacity: 1;
  }
}
</style>
