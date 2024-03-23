import { useApi } from "./useApi";

export interface User {
  username: string;
  isAdmin: boolean;
}

export async function getUser() {
  const res = await useApi<User>("/api/user", "GET", {});

  return res;
}

export async function getUsersByUsername(username: string) {
  const res = await useApi<User[]>("/api/users/by-username", "GET", { username });

  return res;
}
