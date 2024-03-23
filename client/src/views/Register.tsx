import { useState } from "react";

import InputText from "../components/shared/InputText";
import Button from "../components/shared/Button";
import Label from "../components/shared/Label";
import InputPassword from "../components/shared/InputPassword";
import FormMessage, { FormMessageProps } from "../components/shared/FormMessage";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formStatus, setFormStatus] = useState<{ purpose: FormMessageProps["purpose"]; message: string }>({
    purpose: "neutral",
    message: "",
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setFormStatus({ purpose: "error", message: "Passwords do not match." });
      return;
    }

    const res = await register(username, password);
    if (res.success) {
      setFormStatus({ purpose: "success", message: "Register successful." });
      navigate("/login");
    } else {
      setFormStatus({ purpose: "error", message: res.data.error });
    }
  };

  return (
    <main className="flex w-full h-screen justify-center items-center">
      <form onSubmit={onSubmit} className="flex max-w-xl w-full flex-col gap-4">
        <h1 className="w-full text-center text-4xl font-bold mb-4">Register</h1>

        <div className="flex flex-col gap-1">
          <Label required htmlFor="username">
            username
          </Label>
          <InputText
            required
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="username..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label required htmlFor="password">
            password
          </Label>
          <InputPassword
            required
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

        {formStatus.message !== "" && (
          <FormMessage purpose={formStatus.purpose}>{formStatus.message}</FormMessage>
        )}

        <Button type="submit" purpose="neutral" className="h-14">
          Register
        </Button>
      </form>
    </main>
  );
}

export default Register;
