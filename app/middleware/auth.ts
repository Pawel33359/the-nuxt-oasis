import { refreshSession } from "~/composables/useSession";

export const auth = defineNuxtRouteMiddleware(async (to) => {
  console.log(to);
  if (!to.path.startsWith("/account")) {
    return;
  }

  const session = await refreshSession();
  console.log(session);
  if (!session?.user) {
    return navigateTo("/login");
  }
});

export default auth;
