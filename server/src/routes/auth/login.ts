import { RequestHandler } from "express";
import { Route } from "../route";
import { loginUserSchema } from "@shared/schemas/loginUser";
import { prisma } from "@/db/client";
import { User } from ".prisma/client";
import { compare } from "bcryptjs";
import * as jwt from "jsonwebtoken";

const controller: RequestHandler = async (req, res) => {
  const parsedBody = loginUserSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).send(parsedBody.error.issues[0].message);
    return;
  }

  const info = parsedBody.data;

  // find user in db
  let user: User | null = null;
  try {
    user = await prisma.user.findUnique({ where: { username: info.username } });
  } catch (error) {
    console.log(error);
    res.status(500).send("Could not query database for user.");
    return;
  }

  if (!user) {
    res.status(404).send("A user with that username does not exist.");
    return;
  }

  // check if password is correct
  const passwordsMatch = await compare(info.password, user.password);
  if (!passwordsMatch) {
    res.status(403).send("The provided password was incorrect.");
    return;
  }

  // create jwt and cookie
  if (!process.env.JWT_SECRET) {
    console.log("Error: JWT_SECRET env variable missing.");
    res.status(500).send("Could not create authentication token.");
    return;
  }

  const daysToExpire = 60;
  const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: daysToExpire * 24 * 60 * 60,
  });
  res.cookie("token", token, {
    expires: new Date(Date.now() + daysToExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
  });

  // successful login
  res.status(200).json({
    username: user.username,
    isAdmin: user.isAdmin,
  });
};

export default <Route>{
  method: "post",
  path: "/login",
  controller,
};
