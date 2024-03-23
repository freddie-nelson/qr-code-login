import { prisma } from "@/db/client";
import { useToken } from "@/hooks/useToken";
import { RequestHandler } from "express";
import { Route } from "../route";

const controller: RequestHandler = async (req, res) => {
  const token = useToken(req.cookies);
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  const userId = token.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    res.status(401).send("Unauthorized");
    return;
  }

  res.status(200).json({
    username: user.username,
    isAdmin: user.isAdmin,
  });
};

export default <Route>{
  method: "get",
  path: "/user",
  controller,
};
