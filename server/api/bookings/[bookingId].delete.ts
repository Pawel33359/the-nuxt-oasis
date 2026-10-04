import { createError } from "h3";
import { auth } from "../../utils/auth";
import { deleteBooking, getBooking } from "../../utils/data-service";

export default defineEventHandler(async (event) => {
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

  await deleteBooking(bookingId);
});
