import { createError } from "h3";
import { auth } from "../utils/auth";
import { getBookings } from "../utils/data-service";

export default defineEventHandler(async (event) => {
  const session = await auth(event);
  if (!session?.user?.guestId) {
    throw createError({
      statusCode: 401,
      statusMessage: "You must be logged in to view your reservations",
    });
  }

  const bookings = await getBookings(session.user.guestId);

  return bookings;
});
