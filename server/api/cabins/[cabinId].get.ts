import { getCabin } from "../../utils/data-service";

export default defineEventHandler(async (event) => {
  const cabinId = getRouterParam(event, "cabinId");

  console.log("[cabin API] requested cabinId:", cabinId);

  if (!cabinId) {
    console.warn("[cabin API] missing cabinId");
    throw createError({
      statusCode: 400,
      statusMessage: "Cabin id is required",
    });
  }

  const cabin = await getCabin(cabinId);
  console.log("[cabin API] fetched cabin:", cabin?.name || cabin?.id);

  return cabin;
});
