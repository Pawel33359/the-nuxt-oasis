import { deleteBooking } from "../../utils/data-service";
import { getAuthorizedBooking } from "~~/server/utils/booking-auth";

export default defineEventHandler(async (event) => {
  const bookingId = getRouterParam(event, "bookingId");
  const booking = await getAuthorizedBooking(event);

  await deleteBooking(bookingId);
});
