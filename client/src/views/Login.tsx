import { useState } from "react";

import InputText from "../components/shared/InputText";
import Button from "../components/shared/Button";
import Label from "../components/shared/Label";
import InputPassword from "../components/shared/InputPassword";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
  };

  return (
    <main className="flex w-full h-screen justify-center items-center">
      <form onSubmit={onSubmit} className="flex max-w-xl w-full flex-col gap-4">
        <h1 className="w-full text-center text-4xl font-bold mb-4">Login</h1>

        <div className="flex flex-col gap-1">
          <Label htmlFor="username">username</Label>
          <InputText
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="username..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="password">password</Label>
          <InputPassword
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password..."
          />
        </div>

        <Button type="submit" purpose="neutral" className="h-14">
          Login
        </Button>

        <a
          href="/login-qr"
          className="ml-auto -mt-2 underline font-bold text-blue-500 hover:text-blue-300 focus:text-blue-600 transition-colors duration-300"
        >
          Login with QR code
        </a>
      </form>
    </main>
  );
}

export default Login;
