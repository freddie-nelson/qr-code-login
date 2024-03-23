import { Request, Response } from "express";
import { useToken } from "./useToken";
import { prisma } from "@/db/client";

export async function useAdmin(req: Request) {
  const token = useToken(req.cookies);
  if (!token) {
    return false;
  }

  const userId = token?.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return false;
  }

  if (!user.isAdmin) {
    return false;
  }

  return user;
}
