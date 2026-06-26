<script setup lang="ts"></script>

<template>
  <NuxtImg
    src="/bg.png"
    alt="Mountains and forests with two cabins"
    class="hero__img"
  />
  <div>
    <h1>Welcome to paradise.</h1>
    <NuxtLink to="/cabins"> Explore luxury cabins </NuxtLink>
  </div>
</template>

<style scoped>
.hero__img {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
}
</style>
