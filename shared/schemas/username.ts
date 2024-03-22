import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(1, { message: "A username must be provided." })
  .max(255, { message: "Username cannot exceed 255 characters." })
  .regex(/^[a-z0-9_\-.]*$/g, {
    message: "Username may only contain lower case letters, digits and ., -, or _.",
  });
