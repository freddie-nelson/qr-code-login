import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(1, { message: "A password must be provided." })
  .max(255, { message: "Password cannot exceed 255 characters." })
  .regex(/^\S*$/g, { message: "Password must not contain whitespace." });
