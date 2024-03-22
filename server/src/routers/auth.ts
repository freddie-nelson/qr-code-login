import { Router } from "express";
import { useRoute } from "@/hooks/useRoute";
import register from "@/routes/auth/register";
import login from "@/routes/auth/login";
import logout from "@/routes/auth/logout";

export const authRouter = Router();
useRoute(authRouter, register);
useRoute(authRouter, login);
useRoute(authRouter, logout);
