import { z } from "zod";
import { usernameSchema } from "@shared/schemas/username";
import { verify } from "jsonwebtoken";

export const useToken = (cookies: any): { userId: number; username: string } | undefined => {
  if (!cookies || typeof cookies !== "object") return;

  const token = cookies.token;
  if (!token || typeof token !== "string" || !process.env.JWT_SECRET) return;

  const payload = verify(token, process.env.JWT_SECRET);
  const payloadSchema = z.object({
    userId: z.number().min(1),
    username: usernameSchema,
  });

  const parsedPayload = payloadSchema.safeParse(payload);
  if (!parsedPayload.success) return;

  return parsedPayload.data;
};
