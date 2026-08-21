import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateSession } from "@/lib/admin-auth";
import { KELOMPOK_LINE, KELOMPOK_MEMBER } from "@/data/kelompok";
import { mahasiswaData } from "@/data/mahasiswa";

const COOKIE_NAME = "mabim_admin_session";

export async function GET() {
  const store = await cookies();
  const session = store.get(COOKIE_NAME);
  if (!session || !validateSession(session.value)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    kelompok: KELOMPOK_MEMBER,
    kelompokLine: KELOMPOK_LINE,
    mahasiswa: mahasiswaData,
  });
}
