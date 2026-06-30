<script setup lang="ts">
const route = useRoute();

const navigationRoutes = [
  {
    link: "/cabins",
    text: "Cabins",
  },
  {
    link: "/about",
    text: "About",
  },
  {
    link: "/account",
    text: "Guest area",
  },
];
</script>

<template>
  <nav class="header__nav">
    <ul class="header__nav_list">
      <li v-for="navRoute in navigationRoutes" :key="navRoute.link">
        <NuxtLink
          :class="`header__nav_link --link-underline ${
            route.path === navRoute.link ? '--active' : ''
          }`"
          :to="navRoute.link"
        >
          <span>{{ navRoute.text }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.header__nav {
  position: relative;
  z-index: 10;
}
.header__nav_list {
  list-style: none;
  display: flex;
  gap: var(--space-5);
}
.header__nav_link {
  text-decoration: none;
  display: block;
  font-size: var(--text-xl);
  padding: var(--space-2) var(--space-5);
}

.header__nav_link.--active {
  color: var(--primary);
}
</style>
