import { RequestHandler } from "express";
import { Route } from "../route";
import { loginUserSchema } from "@shared/schemas/loginUser";
import { prisma } from "@/db/client";
import { User } from ".prisma/client";
import { compare } from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { useJWT } from "@/hooks/useJWT";

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

  const success = useJWT(user.id, user.username, res);
  if (!success) {
    return;
  }

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
