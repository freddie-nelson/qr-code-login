import { useState } from "react";

import InputText from "../components/shared/InputText";
import Button from "../components/shared/Button";
import Label from "../components/shared/Label";
import InputPassword from "../components/shared/InputPassword";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
  };

  return (
    <main className="flex w-full h-screen justify-center items-center">
      <form onSubmit={onSubmit} className="flex max-w-xl w-full flex-col gap-4">
        <h1 className="w-full text-center text-4xl font-bold mb-4">Register</h1>

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

        <div className="flex flex-col gap-1 -mt-4">
          <Label htmlFor="password">confirm password</Label>
          <InputPassword
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="password..."
          />
        </div>

        <Button type="submit" purpose="neutral" className="h-14">
          Register
        </Button>
      </form>
    </main>
  );
}

export default Register;
