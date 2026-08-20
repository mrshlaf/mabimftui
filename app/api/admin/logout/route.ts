import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "mabim_admin_session";

export async function POST() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return NextResponse.json({ ok: true });
}
