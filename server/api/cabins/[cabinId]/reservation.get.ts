import {
  getBookedDatesByCabinId,
  getSettings,
} from "../../../utils/data-service";

export default defineEventHandler(async (event) => {
  const cabinId = getRouterParam(event, "cabinId");

  if (!cabinId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cabin id is required",
    });
  }

  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabinId),
  ]);

  return {
    settings,
    bookedDates: bookedDates.map((date) => date.toISOString()),
  };
});