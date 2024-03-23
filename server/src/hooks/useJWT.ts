import { Response } from "express";
import * as jwt from "jsonwebtoken";

export function useJWT(userId: number, username: string, res: Response) {
  // create jwt and cookie
  if (!process.env.JWT_SECRET) {
    console.log("Error: JWT_SECRET env variable missing.");
    res.status(500).send("Could not create authentication token.");
    return false;
  }

  const daysToExpire = 60;
  const token = jwt.sign({ userId: userId, username: username }, process.env.JWT_SECRET, {
    expiresIn: daysToExpire * 24 * 60 * 60,
  });

  res.cookie("token", token, {
    expires: new Date(Date.now() + daysToExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
  });

  return true;
}
