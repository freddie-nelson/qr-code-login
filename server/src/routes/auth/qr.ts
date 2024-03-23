import { RequestHandler } from "express";
import { Route } from "../route";
import { randomUUID } from "crypto";
import { useToken } from "@/hooks/useToken";
import { prisma } from "@/db/client";
import { useAdmin } from "@/hooks/useAdmin";
import { useJWT } from "@/hooks/useJWT";
import { User } from "@prisma/client";

export interface QR {
  id: string;
  status: "waiting" | "ready";

  user?: User;
}

const qrCodes = new Map<string, QR>();

const qrController: RequestHandler = async (req, res) => {
  const id = randomUUID();
  qrCodes.set(id, {
    id,
    status: "waiting",
  });

  res.status(200).json({
    id,
  });
};

export const qr = <Route>{
  method: "get",
  path: "/login/qr",
  controller: qrController,
};

const qrStatusController: RequestHandler = async (req, res) => {
  const id = req.query.id as string;
  if (!id) {
    res.status(400).send("Missing id in query parameters.");
    return;
  }

  const qr = qrCodes.get(id);
  if (!qr) {
    res.status(404).send("QR code not found.");
    return;
  }

  res.status(200).json({
    status: qr.status,
  });
};

export const qrStatus = <Route>{
  method: "get",
  path: "/login/qr/status",
  controller: qrStatusController,
};

const qrAuthenticateController: RequestHandler = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    res.status(400).send("Missing id in request body.");
    return;
  }

  const qr = qrCodes.get(id);
  if (!qr) {
    res.status(404).send("QR code not found.");
    return;
  }

  if (qr.status !== "ready") {
    res.status(400).send("QR code not ready.");
    return;
  }

  if (!qr.user) {
    res.status(500).send("User not found.");
    return;
  }

  const success = useJWT(qr.user.id, qr.user.username, res);
  if (!success) {
    return;
  }

  qrCodes.delete(id);

  res.status(200).json({
    username: qr.user.username,
    isAdmin: qr.user.isAdmin,
  });
};

export const qrAuthenticate = <Route>{
  method: "post",
  path: "/login/qr/authenticate",
  controller: qrAuthenticateController,
};

const qrReadyController: RequestHandler = async (req, res) => {
  const admin = await useAdmin(req);
  if (!admin) {
    res.status(403).send("Unauthorized.");
    return;
  }

  const id = req.body.id;
  if (!id) {
    res.status(400).send("Missing id in request body.");
    return;
  }

  const username = req.body.username;
  if (!username) {
    res.status(400).send("Missing username in request body.");
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    res.status(404).send("User not found.");
    return;
  }

  const qr = qrCodes.get(id);
  if (!qr) {
    res.status(404).send("QR code not found.");
    return;
  }

  console.log("qr ready: " + id);

  qr.status = "ready";
  qr.user = user;

  res.status(200).json({});
};

export const qrAdminReady = <Route>{
  method: "post",
  path: "/login/qr/ready",
  controller: qrReadyController,
};
