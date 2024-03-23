import { useApi } from "./useApi";

export async function login(username: string, password: string) {
  const res = await useApi<{ username: string; isAdmin: boolean }>("/auth/login", "POST", {
    username,
    password,
  });

  return res;
}
