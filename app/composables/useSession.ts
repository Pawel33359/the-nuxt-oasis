export type Session = {
  user: {
    email: string;
    name: string;
    guestId: string;
  };
} | null;

export const useSession = () => useState<Session>("session", () => null);

export async function refreshSession() {
  const state = useSession();
  const session = await $fetch<Session>("/api/auth/session").catch(() => null);
  state.value = session;
  return state.value;
}
