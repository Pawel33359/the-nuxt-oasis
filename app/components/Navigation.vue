<script setup lang="ts">
const route = useRoute();

const navigationRoutes = [
  {
    link: "/",
    text: "Home",
    icon: "/logo.png",
    show: "mobile",
  },
  {
    link: "/cabins",
    text: "Cabins",
    icon: "",
    show: "all",
  },
  {
    link: "/about",
    text: "About",
    icon: "",
    show: "all",
  },
  {
    link: "/account",
    text: "Guest area",
    icon: "",
    show: "all",
  },
];

const { data: session } = useAuth();

const mobileNavOpen = ref(false);
const openMobileNav = () => (mobileNavOpen.value = true);
const closeMobileNav = () => (mobileNavOpen.value = false);

//zamykanie menu mobile po zmianie strony
watch(
  () => route.fullPath,
  () => {
    mobileNavOpen.value = false;
  }
);

// Bug fix przechodzenia do menu tabem na mobile
</script>

<template>
  <!-- MOBILE -->
  <button class="mobile-nav-btn" data-action="open" @click="openMobileNav">
    <Icon name="heroicons:bars-3-20-solid" size="36" />
  </button>
  <nav
    :class="`header__nav ${mobileNavOpen ? `--mobile-open` : ``}`"
    id="top-menu"
  >
    <button class="mobile-nav-btn" data-action="close" @click="closeMobileNav">
      <Icon name="heroicons:x-mark-20-solid" size="36" />
    </button>
    <ul class="header__nav_list">
      <li v-for="navRoute in navigationRoutes" :key="navRoute.link">
        <NuxtLink
          class="header__nav_link --link-underline"
          :data-active="route.path === navRoute.link"
          :data-show="navRoute.show"
          :to="navRoute.link"
        >
          <div
            v-if="session?.user?.image && navRoute.link === '/account'"
            class="header__avatar"
          >
            <img :src="session.user.image" alt="User avatar" />
          </div>
          <div v-else-if="navRoute.icon !== ''" class="header__nav_link--icon">
            <NuxtImg
              :src="navRoute.icon"
              width="36"
              height="36"
              loading="lazy"
            />
          </div>
          <span>{{ navRoute.text }}</span>
        </NuxtLink>
      </li>
    </ul>

    <div id="aside-menu-target"></div>
  </nav>
</template>

<style scoped>
.header__nav {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
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
.header__nav_link[data-active="true"] {
  color: var(--primary);
}
.header__avatar img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
}
.mobile-nav-btn {
  color: var(--text);
}
.header__nav_link--icon {
  margin-right: var(--space-2);
}
@media (min-width: 979px) {
  .mobile-nav-btn {
    display: none;
  }
  .header__nav_link[data-show="mobile"] {
    display: none;
  }
}
@media (max-width: 978px) {
  .header__nav {
    position: fixed;
    top: 0;
    transform: translateX(100%);
    width: 100vw;
    height: 100vh;
    background: var(--bg);
    transition: all var(--animation-sm);
    z-index: 100;
    left: 0;
    padding: 4rem;
  }
  .header__nav_link {
    font-size: var(--text-4xl);
  }
  .header__nav_list {
    flex-direction: column;
    padding: 2rem;
  }
  .header__nav.--mobile-open {
    transform: translateX(0);
  }
  .mobile-nav-btn[data-action="close"] {
    align-self: end;
    justify-self: end;
  }
  .header__nav_link[data-show="desktop"] {
    display: none;
  }
}

@media (min-width: 757px) {
  #aside-menu-target {
    display: none;
  }
}
</style>
