import { useState } from "react";
import { API_URL } from "./api/useApi";

function App() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-12">QR Logins</h1>

      <div className="underline font-semibold text-blue-400 flex flex-col gap-12 text-4xl items-center text-center">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/admin">Admin</a>
        <a href={`${API_URL}/api/getUser`} target="_blank">
          Get User to accept https from server
        </a>
      </div>
    </main>
  );
}

export default App;
