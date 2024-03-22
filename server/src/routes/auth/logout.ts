import { RequestHandler } from "express";
import { Route } from "../route";
import { User } from ".prisma/client";
import { useToken } from "@/hooks/useToken";

const controller: RequestHandler = async (req, res) => {
  const token = useToken(req.cookies);
  if (!token) {
    res.status(403).send("Unauthorized user requesting logout.");
    return;
  }

  // remove token cookie
  res.clearCookie("token");

  // successful logout
  res.status(200).send("Successfully logged out.");
};

export default <Route>{
  method: "get",
  path: "/logout",
  controller,
};
