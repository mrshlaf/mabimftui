import { cookies } from "next/headers";
import { validateSession } from "@/lib/admin-auth";
import AdminPanel from "./admin-panel";

export default async function AdminPage() {
  const store = await cookies();
  const session = store.get("mabim_admin_session");
  const authenticated = session ? validateSession(session.value) : false;
  return <AdminPanel authenticated={authenticated} />;
}
