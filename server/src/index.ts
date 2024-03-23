require("dotenv").config();
import * as express from "express";
import * as cors from "cors";
import { baseRouter } from "./routers/base";
import { authRouter } from "./routers/auth";
import { apiRouter } from "./routers/api";
import cookieParser = require("cookie-parser");
import createAdminAccount from "./helpers/createAdminAccount";
import { createServer } from "https";
import { readFileSync } from "fs";

const app = express();

// config
app.set("trust proxy", true);

// middleware
app.use(
  cors({
    origin: process.env.NODE_ENV !== "production" ? true : [""],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routers
app.use(baseRouter);
app.use("/auth", authRouter);
app.use("/api", apiRouter);

// admin account
createAdminAccount();

const server = createServer(
  {
    key: readFileSync("ssl/key.pem"),
    cert: readFileSync("ssl/cert.pem"),
  },
  app
);

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
