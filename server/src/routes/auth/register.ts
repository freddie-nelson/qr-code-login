import { RequestHandler } from "express";
import { hash } from "bcryptjs";
import { Route } from "../route";
import { registerUserSchema } from "@shared/schemas/registerUser";
import { prisma } from "@/db/client";

const controller: RequestHandler = async (req, res) => {
  const parsedBody = registerUserSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).send(parsedBody.error.issues[0].message);
    return;
  }

  const info = parsedBody.data;

  // check if username or email is taken
  try {
    const exists = await prisma.user.findMany({
      where: {
        username: info.username,
      },
    });

    if (exists.length > 0) {
      res.status(409).send("The provided email or username is already taken.");
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Could not determine if username or email is already taken.");
    return;
  }

  // add user to db
  try {
    await prisma.user.create({
      data: {
        username: info.username,
        password: await hash(info.password, 10),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Account could not be created.");
    return;
  }

  res.status(200).send("Account created successfully.");
};

export default <Route>{
  method: "post",
  path: "/register",
  controller,
};
