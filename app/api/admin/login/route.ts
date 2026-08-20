import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_USER = process.env.ADMIN_USER ?? "SCMabim";
const ADMIN_PASS = process.env.ADMIN_PASS ?? "SCAdminMantep";
const SECRET = process.env.ADMIN_SECRET ?? "mabim-admin-secret-key-2026";
const COOKIE_NAME = "mabim_admin_session";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function sign(payload: string) {
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(payload);
  return hmac.digest("hex");
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.username || !body?.password) {
    return NextResponse.json({ error: "Field tidak lengkap." }, { status: 400 });
  }

  if (body.username !== ADMIN_USER || body.password !== ADMIN_PASS) {
    return NextResponse.json({ error: "Username atau password salah." }, { status: 401 });
  }

  const token = `${Date.now()}.${sign(String(Date.now()))}`;
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
