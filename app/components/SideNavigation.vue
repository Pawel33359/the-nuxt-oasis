<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

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

const isMobile = useMediaQuery("(max-width: 756px)");
console.log(isMobile.value);
</script>

<template>
  <aside>
    <nav class="side-nav" id="aside-menu">
      <Teleport :to="isMobile ? '#aside-menu-target' : '#aside-menu'">
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
      </Teleport>
    </nav>
  </aside>
</template>

<style scoped>
.side-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  /* padding: var(--space-5) var(--space-5) var(--space-8); */
  justify-content: space-between;
  height: 100%;

  max-height: min(100vh, 500px);
  position: sticky;
  top: calc(var(--header-height, 0px) + 2rem);
}
.side-nav__link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-5);
  justify-content: center;
}
.side-nav__link--active {
  pointer-events: none;
  color: var(--primary);
}
.side-nav__sign-out {
  border-radius: 0;
  width: 100%;
}

.side-nav__link,
.side-nav__sign-out {
  font-size: var(--text-4xl);
}

.side-nav__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-bottom: var(--space-2);
  padding-top: var(--space-2);
  border-top: 2px solid var(--text);
}

@media (min-width: 757px) {
  .side-nav__list {
    border-top: none;
    gap: 0;
    padding: 0;
  }
  .side-nav__link,
  .side-nav__sign-out {
    font-size: var(--text-base);
  }
  .side-nav {
    border-right: 1px solid var(--border);
  }
  .side-nav__link {
    justify-content: start;
  }
  .side-nav__link--active {
    background: var(--primary-dark);
    color: var(--text);
  }
}
</style>
