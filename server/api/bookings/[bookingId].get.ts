import { getAuthorizedBooking } from "~~/server/utils/booking-auth";

export default defineEventHandler(async (event) => {
  return await getAuthorizedBooking(event);
});
