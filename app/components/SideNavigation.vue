<script setup lang="ts">
const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: "heroicons:home-20-solid",
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: "heroicons:calendar-days-20-solid",
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: "heroicons:user-20-solid",
  },
];
</script>

<template>
  <aside>
    <nav class="side-nav">
      <ul class="side-nav__list">
        <li v-for="link in navLinks" :key="link.name">
          <NuxtLink
            :to="link.href"
            class="side-nav__link --link-underline"
            active-class="side-nav__link--active"
          >
            <Icon :name="link.icon" />
            <span>{{ link.name }}</span>
          </NuxtLink>
        </li>
      </ul>
      <SignOutButton class="side-nav__sign-out" />
    </nav>
  </aside>
</template>

<style scoped>
.side-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  /* padding: var(--space-5) var(--space-5) var(--space-8); */
  border-right: 1px solid var(--border);
  justify-content: space-between;
  height: 100%;

  max-height: min(100vh, 500px);
  position: sticky;
  top: 5rem;
}
.side-nav__link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-5);
}
.side-nav__link--active {
  background: var(--primary-dark);
  pointer-events: none;
}
.side-nav__sign-out {
  border-radius: 0;
}
</style>
