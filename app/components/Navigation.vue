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

const { data: session } = useAuth();
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
          <div
            v-if="session?.user?.image && navRoute.link === '/account'"
            class="header__avatar"
          >
            <img :src="session.user.image" alt="User avatar" />
          </div>
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-size: var(--text-xl);
  padding: var(--space-2) var(--space-5);
}
.header__avatar {
  display: flex;
}
.header__nav_link.--active {
  color: var(--primary);
}
.header__avatar img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
}
</style>
