"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearSession, coastalRequest, currentAccount, saveSession, type Session } from "./coast";

export async function authenticate(mode: "signin" | "signup", data: FormData) {
  const email = String(data.get("email") ?? "").trim();
  const password = String(data.get("password") ?? "");
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < (mode === "signup" ? 8 : 1) || password.length > 1024) {
    redirect("/?account=invalid#account");
  }
  const path = mode === "signup" ? "/auth/v1/signup" : "/auth/v1/token?grant_type=password";
  const session = await coastalRequest<Session>(path, { method: "POST", body: JSON.stringify({ email, password }) }).catch(() => null);
  if (!session) redirect("/?account=failed#account");
  if (!(await saveSession(session))) redirect("/?account=verify#account");
  redirect("/#account");
}

export async function signOut() {
  const account = await currentAccount();
  if (account) await coastalRequest("/auth/v1/logout?scope=local", { method: "POST" }, account.token).catch(() => undefined);
  await clearSession();
  redirect("/#account");
}

export async function saveNotice(id: string | null, data: FormData) {
  const account = await currentAccount();
  if (!account?.admin) redirect("/#account");
  const title = String(data.get("title") ?? "").trim();
  const body = String(data.get("body") ?? "").trim();
  if (!title || title.length > 120 || !body || body.length > 8000) redirect("/?notice=invalid#notices");
  const query = id ? "?" + new URLSearchParams({ id: "eq." + id }) : "";
  await coastalRequest("/rest/v1/coastal_notices" + query, {
    method: id ? "PATCH" : "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ title, body }),
  }, account.token).catch(() => redirect("/?notice=failed#notices"));
  revalidatePath("/");
  redirect("/#notices");
}

export async function deleteNotice(id: string) {
  const account = await currentAccount();
  if (!account?.admin) redirect("/#account");
  const query = new URLSearchParams({ id: "eq." + id });
  await coastalRequest("/rest/v1/coastal_notices?" + query, {
    method: "DELETE", headers: { Prefer: "return=minimal" },
  }, account.token).catch(() => redirect("/?notice=failed#notices"));
  revalidatePath("/");
  redirect("/#notices");
}