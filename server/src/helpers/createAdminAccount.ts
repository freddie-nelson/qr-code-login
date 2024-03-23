import { hash } from "bcryptjs";

import { config } from "dotenv";
config();

import { prisma } from "../db/client";

export default async function createAdminAccount() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.error("ADMIN_USERNAME and ADMIN_PASSWORD are required in .env");
    return;
  }

  let admin = await prisma.user.findUnique({
    where: { username },
  });

  if (!admin) {
    admin = await prisma.user.create({
      data: {
        username,
        password: await hash(password, 10),
        isAdmin: true,
      },
    });
  }

  return admin;
}
