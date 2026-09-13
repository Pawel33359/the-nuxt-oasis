export const auth = defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith("/account")) {
    return;
  }

  const { getSession } = useAuth();
  const session = await getSession();

  if (!session?.user) {
    return navigateTo("/login");
  }
});

export default auth;
