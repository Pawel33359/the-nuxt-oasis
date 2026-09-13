/// <reference types="node" />

import * as GoogleProviderModule from "next-auth/providers/google";
import { NuxtAuthHandler } from "#auth";
import { createGuest, getGuest } from "../../utils/data-service";

const googleProviderFactory =
  typeof GoogleProviderModule.default === "function"
    ? GoogleProviderModule.default
    : (
        GoogleProviderModule.default as typeof GoogleProviderModule & {
          default?: typeof GoogleProviderModule.default;
        }
      )?.default;

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    googleProviderFactory({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }

      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name || user.email,
          });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      if (!session.user?.email) {
        return session;
      }

      const guest = await getGuest(session.user.email);

      if (guest) {
        session.user = {
          ...session.user,
          guestId: guest.id,
        };
      }

      return session;
    },
  },
});
