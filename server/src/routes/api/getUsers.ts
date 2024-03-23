import { prisma } from "@/db/client";
import { RequestHandler } from "express";
import { Route } from "../route";
import { useAdmin } from "@/hooks/useAdmin";

const byUsernameController: RequestHandler = async (req, res) => {
  const admin = useAdmin(req);
  if (!admin) {
    res.status(401).send("Unauthorized");
    return;
  }

  const username = req.query.username as string;
  if (!username) {
    res.status(400).send("Missing username in query parameters.");
    return;
  }

  const users = await prisma.user.findMany({
    select: {
      username: true,
      isAdmin: true,
    },
    where: {
      username: {
        search: `${username}:*`,
      },
    },
  });

  res.status(200).json(users);
};

export const byUsername = <Route>{
  method: "get",
  path: "/users/by-username",
  controller: byUsernameController,
};
