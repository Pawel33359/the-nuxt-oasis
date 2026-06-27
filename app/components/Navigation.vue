<script setup lang="ts">
const route = useRoute();
console.log(route);

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
          :class="`header__nav_link ${
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
  font-size: var(--text-xl);
  display: block;
  padding: var(--space-2) var(--space-5);
}
.header__nav_link span {
  display: inline-block;
  overflow: hidden;
  position: relative;
  padding: var(--space-1) 0;
}
.header__nav_link span::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 1px;
  background: var(--primary-light);
  bottom: 0;
  left: 0;
  transform: translateX(100%);
  transition: transform var(--transition-md);
}

.header__nav_link:hover span::after {
  transform: translateX(0);
}

.header__nav_link.--active {
  color: var(--primary);
}
</style>
