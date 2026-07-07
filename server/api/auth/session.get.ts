import { auth } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  const session = await auth(event);
  return session;
});
