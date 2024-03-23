require("dotenv").config();
import * as express from "express";
import * as cors from "cors";
import { baseRouter } from "./routers/base";
import { authRouter } from "./routers/auth";
import { apiRouter } from "./routers/api";
import cookieParser = require("cookie-parser");
import createAdminAccount from "./helpers/createAdminAccount";

const app = express();

// config
app.set("trust proxy", true);

// middleware
app.use(
  cors({
    origin: process.env.NODE_ENV !== "production" ? "http://localhost:5173" : [""],
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

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
