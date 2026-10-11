import { updateBooking } from "../../utils/data-service";
import { getAuthorizedBooking } from "~~/server/utils/booking-auth";
import { createError } from "h3";

function getNoTimeZoneDate(value: string) {
  const date = value.split("T")[0];

  return date;
}

export default defineEventHandler(async (event) => {
  const booking = await getAuthorizedBooking(event);
  const bookingId = getRouterParam(event, "bookingId");
  const body = await readBody(event);

  const changes = {
    startDate: getNoTimeZoneDate(booking.startDate) !== body.startDate,
    endDate: getNoTimeZoneDate(booking.endDate) !== body.endDate,
    numGuests: booking.numGuests !== body.numGuests,
    observations: booking.observations !== body.observations,
  };

  console.log(changes);

  //SPRAWDZENIE CZY BYŁY JAKIEŚ ZMIANY
  if (
    !(
      changes.startDate ||
      changes.endDate ||
      changes.observations ||
      changes.numGuests
    )
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "No changes detected in reservation data",
    });
  }

  // MOZLIWE DODATKOWE SPRAWDZENIE NA WYPADEK ZLEGO STATUSU ZAMOWIENIA(ZABLOKOWAC ZMIANE ZAKONCZONEGO POBYTU)

  await updateBooking(bookingId, body);
  return { success: true };
});
