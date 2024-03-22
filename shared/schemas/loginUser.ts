import { z } from "zod";
import { passwordSchema } from "./password";
import { usernameSchema } from "./username";

export const loginUserSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});
