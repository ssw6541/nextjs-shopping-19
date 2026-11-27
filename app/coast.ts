import { cookies } from "next/headers";

const sessionCookie = "coastal-session";

export async function coastalRequest<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !key) throw new Error("Supabase configuration is missing");
  const headers = new Headers(options.headers);
  headers.set("apikey", key);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", "Bearer " + token);
  const response = await fetch(new URL(path, url), { ...options, headers, cache: "no-store" });
  if (!response.ok) throw new Error("Supabase request failed: " + response.status);
  const body = await response.text();
  return body ? JSON.parse(body) as T : undefined as T;
}

type User = { id: string; email: string };
type Session = { access_token?: string; expires_in?: number };

export async function currentAccount() {
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token) return null;
  const user = await coastalRequest<User>("/auth/v1/user", {}, token).catch(() => null);
  if (!user) return null;
  const admin = await coastalRequest<boolean>("/rest/v1/rpc/coastal_is_admin", { method: "POST", body: "{}" }, token).catch(() => false);
  return { user, token, admin };
}

export async function saveSession(session: Session) {
  if (!session.access_token) return false;
  (await cookies()).set(sessionCookie, session.access_token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", path: "/", maxAge: session.expires_in ?? 3600,
  });
  return true;
}

export async function clearSession() {
  (await cookies()).delete(sessionCookie);
}

export type Notice = { id: string; title: string; body: string; created_at: string };
export type { Session };