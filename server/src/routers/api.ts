import { Router } from "express";
import { useRoute } from "../hooks/useRoute";
import getUser from "@/routes/api/getUser";
import { byUsername } from "@/routes/api/getUsers";

export const apiRouter = Router();
useRoute(apiRouter, getUser);
useRoute(apiRouter, byUsername);
