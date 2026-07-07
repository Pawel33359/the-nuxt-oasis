import { signOut } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  await signOut({ event });
  return { success: true };
});
