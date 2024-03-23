import { useEffect, useState } from "react";
import { API_URL } from "./api/useApi";
import { User, getUser } from "./api/user";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser().then((res) => {
      if (!res.success) {
        return;
      }

      setUser(res.data);
    });
  }, []);

  return (
    <main>
      <h1 className="text-4xl font-bold text-center mt-12 mb-6">QR Logins</h1>
      <p className="text-2xl font-semibold text-center mb-12">
        {user === null ? "You are not logged in." : `Logged in as '${user.username}'.`}
      </p>

      <div className="underline font-semibold text-blue-400 flex flex-col gap-12 text-4xl items-center text-center">
        <a href="/login">Login</a>
        <a href="/login-qr">Login QR</a>
        <a href="/register">Register</a>
        <a href="/admin">Admin</a>
        <a href="/logout">Logout</a>
        <a href={`${API_URL}/api/getUser`} target="_blank">
          Get User to accept https from server
        </a>
      </div>
    </main>
  );
}

export default App;
