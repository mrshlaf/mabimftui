import { cookies } from "next/headers";
import AdminPanel from "./admin-panel";

export default async function AdminPage() {
  const store = await cookies();
  const session = store.get("mabim_admin_session");
  return <AdminPanel authenticated={!!session} />;
}
