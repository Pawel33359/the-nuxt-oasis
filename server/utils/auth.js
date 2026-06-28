import { getCookie, setCookie, deleteCookie } from "h3";
import { createGuest, getGuest } from "./data-service";

const SESSION_COOKIE = "nuxt-oasis-session";

function parseSessionCookie(cookieValue) {
  if (!cookieValue) return null;

  try {
    return JSON.parse(cookieValue);
  } catch {
    return null;
  }
}

function serializeSessionCookie(session) {
  return JSON.stringify(session);
}

export async function auth(event) {
  const cookieValue = event ? getCookie(event, SESSION_COOKIE) : null;
  const session = parseSessionCookie(cookieValue);

  if (!session?.email) {
    return null;
  }

  const guest = await getGuest(session.email);

  if (!guest) {
    return null;
  }

  return {
    user: {
      email: guest.email,
      name: guest.fullName || guest.email,
      guestId: guest.id,
    },
  };
}

export async function signIn(provider = "google", options = {}) {
  const email =
    options.email || process.env.NUXT_DEFAULT_AUTH_EMAIL || "guest@example.com";
  const name = options.name || "Guest User";
  const guest =
    (await getGuest(email)) || (await createGuest({ email, fullName: name }));

  const sessionPayload = {
    email: guest.email,
    name: guest.fullName || guest.email,
    guestId: guest.id,
  };

  if (options.event) {
    setCookie(
      options.event,
      SESSION_COOKIE,
      serializeSessionCookie(sessionPayload),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      }
    );
  }

  return {
    user: {
      email: guest.email,
      name: guest.fullName || guest.email,
      guestId: guest.id,
    },
  };
}

export async function signOut(options = {}) {
  if (options.event) {
    deleteCookie(options.event, SESSION_COOKIE);
  }

  return true;
}
