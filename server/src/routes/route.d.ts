import { RequestHandler } from "express";

export interface Route {
  method: "get" | "post" | "patch" | "delete";
  path: string;
  controller: RequestHandler;
}
