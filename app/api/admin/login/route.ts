import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createToken } from "@/lib/admin-auth";

const ADMIN_USER = process.env.ADMIN_USER ?? "SCMabim";
const ADMIN_PASS = process.env.ADMIN_PASS ?? "SCAdminMantep";
const COOKIE_NAME = "mabim_admin_session";
const MAX_AGE = 60 * 60 * 8;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 1000;

const attempts = new Map<string, { count: number; resetAt: number }>();

function getIP(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  const ip = getIP(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak percobaan. Coba lagi dalam 1 menit." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  if (!body?.username || !body?.password) {
    return NextResponse.json(
      { error: "Field tidak lengkap." },
      { status: 400 },
    );
  }

  if (body.username !== ADMIN_USER || body.password !== ADMIN_PASS) {
    return NextResponse.json(
      { error: "Username atau password salah." },
      { status: 401 },
    );
  }

  const token = createToken();
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
