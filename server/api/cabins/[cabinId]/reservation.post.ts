import { createError } from "h3";
import { auth } from "../../../utils/auth";
import {
  createBooking,
  getBookedDatesByCabinId,
  getCabin,
  getSettings,
} from "../../../utils/data-service";

function getDateKey(value: string | number | Date) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
}

export default defineEventHandler(async (event) => {
  const session = await auth(event);
  if (!session?.user?.guestId) {
    throw createError({
      statusCode: 401,
      statusMessage: "You must be logged in to make a reservation",
    });
  }

  const cabinId = getRouterParam(event, "cabinId");
  const body = await readBody(event);
  const startDate = getDateKey(body?.startDate);
  const endDate = getDateKey(body?.endDate);
  const numGuests = Number(body?.numGuests);

  if (!cabinId || !startDate || !endDate || !Number.isInteger(numGuests)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Please provide valid reservation details",
    });
  }

  const [cabin, settings, bookedDates] = await Promise.all([
    getCabin(cabinId),
    getSettings(),
    getBookedDatesByCabinId(cabinId),
  ]);

  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);
  const numNights = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (end <= start) {
    throw createError({
      statusCode: 400,
      statusMessage: "Your checkout date must be after your check-in date",
    });
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (start < today) {
    throw createError({
      statusCode: 400,
      statusMessage: "Your check-in date cannot be in the past",
    });
  }

  if (numNights < settings.minBookingLength) {
    throw createError({
      statusCode: 400,
      statusMessage: `Your stay must be at least ${settings.minBookingLength} nights`,
    });
  }

  if (numNights > settings.maxBookingLength) {
    throw createError({
      statusCode: 400,
      statusMessage: `Your stay cannot be longer than ${settings.maxBookingLength} nights`,
    });
  }

  if (numGuests < 1 || numGuests > cabin.maxCapacity) {
    throw createError({
      statusCode: 400,
      statusMessage: "The number of guests exceeds this cabin's capacity",
    });
  }

  const bookedDateKeys = new Set(bookedDates.map((date) => getDateKey(date)));
  const selectedDate = new Date(start);
  while (selectedDate < end) {
    if (bookedDateKeys.has(selectedDate.toISOString().slice(0, 10))) {
      throw createError({
        statusCode: 409,
        statusMessage: "Some selected dates are already booked",
      });
    }
    selectedDate.setUTCDate(selectedDate.getUTCDate() + 1);
  }

  const booking = await createBooking({
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice: cabin.regularPrice - cabin.discount,
    extrasPrice: 0,
    totalPrice: numNights * (cabin.regularPrice - cabin.discount),
    guestId: session.user.guestId,
    cabinId: cabin.id,
    observations: body?.observations?.trim() || null,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
  });

  return { booking };
});
