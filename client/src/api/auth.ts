import { useApi } from "./useApi";

export async function login(username: string, password: string) {
  const res = await useApi<{ username: string; isAdmin: boolean }>("/auth/login", "POST", {
    username,
    password,
  });

  return res;
}

export async function register(username: string, password: string) {
  const res = await useApi<{ username: string; isAdmin: boolean }>("/auth/register", "POST", {
    username,
    password,
  });

  return res;
}

export async function logout() {
  const res = await useApi("/auth/logout", "GET", {});

  return res;
}

export async function getLoginQR() {
  const res = await useApi<{ id: string }>("/auth/login/qr", "GET", {});

  return res;
}

export async function getLoginQRStatus(id: string) {
  const res = await useApi<{ status: "waiting" | "ready" }>("/auth/login/qr/status", "GET", { id });

  return res;
}

export async function getLoginQRAuthenticate(id: string) {
  const res = await useApi<{ username: string; isAdmin: boolean }>("/auth/login/qr/authenticate", "POST", {
    id,
  });

  return res;
}

export async function loginQRReady(id: string, username: string) {
  const res = await useApi<{}>("/auth/login/qr/ready", "POST", { id, username });

  return res;
}
