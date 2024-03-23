import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    logout().then(() => {
      navigate("/");
    });
  }, []);

  return <h1>Logging out...</h1>;
}

export default Logout;
