export type Session =
  | {
      user: {
        email: string;
        name: string;
        guestId: string;
      };
    }
  | null;

export const useSession = () => useState<Session>("session", () => null);

export async function refreshSession() {
  const session = await $fetch<Session>("/api/auth/session").catch(() => null);
  const state = useSession();
  state.value = session;
  return state.value;
}
