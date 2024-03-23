import { Router } from "express";
import { useRoute } from "@/hooks/useRoute";
import register from "@/routes/auth/register";
import login from "@/routes/auth/login";
import logout from "@/routes/auth/logout";
import { qr, qrAdminReady, qrAuthenticate, qrStatus } from "@/routes/auth/qr";

export const authRouter = Router();
useRoute(authRouter, register);
useRoute(authRouter, login);
useRoute(authRouter, logout);
useRoute(authRouter, qr);
useRoute(authRouter, qrStatus);
useRoute(authRouter, qrAuthenticate);
useRoute(authRouter, qrAdminReady);
