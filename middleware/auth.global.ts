import { refreshSession } from "~/composables/useSession";

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith("/account")) {
    return;
  }

  const session = await refreshSession();

  if (!session?.user) {
    return navigateTo("/login");
  }
});
