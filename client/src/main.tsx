import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Login from "./views/Login.tsx";
import Register from "./views/Register.tsx";

import "./css/index.scss";
import LoginQR from "./views/LoginQR.tsx";
import Admin from "./views/Admin.tsx";
import Logout from "./views/Logout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login-qr",
    element: <LoginQR />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
