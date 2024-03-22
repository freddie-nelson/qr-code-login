import { Router } from "express";
import { Route } from "@/routes/route";

export const useRoute = (router: Router, route: Route) => {
  router[route.method](route.path, route.controller);
};
