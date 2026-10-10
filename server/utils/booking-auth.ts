import type { H3Event } from "h3";
import { createError } from "h3";
import { auth } from "./auth";
import { getBooking } from "./data-service";

export async function getAuthorizedBooking(event: H3Event) {
  const bookingId = getRouterParam(event, "bookingId");
  if (!bookingId) {
    console.warn("[booking API] missing bookingId");
    throw createError({
      statusCode: 400,
      statusMessage: "Booking id is required",
    });
  }
  const session = await auth(event);

  if (!session?.user?.guestId) {
    throw createError({
      statusCode: 401,
      statusMessage: "You must be logged in",
    });
  }

  const booking = await getBooking(bookingId);
  if (!booking) {
    throw createError({
      statusCode: 404,
      statusMessage: "Booking not found",
    });
  }

  if (booking.guestId !== session.user.guestId) {
    throw createError({
      statusCode: 403,
      statusMessage: "You are not authorized to delete this booking",
    });
  }

  return booking;
}
