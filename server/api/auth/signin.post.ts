import { signIn } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  const session = await signIn("google", { event });
  return session;
});
