import { getServerSession } from "#auth";
import { getGuest } from "./data-service";

export async function auth(event) {
  const session = await getServerSession(event);

  if (!session?.user?.email) {
    return null;
  }

  const guest = await getGuest(session.user.email);

  if (!guest) {
    return null;
  }

  return {
    ...session,
    user: {
      ...session.user,
      email: guest.email,
      name: guest.fullName || guest.email,
      guestId: guest.id,
    },
  };
}
