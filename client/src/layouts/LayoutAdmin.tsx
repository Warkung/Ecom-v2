import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/navbar/SidebarAdmin";

export default function LayoutAdmin() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SidebarAdmin />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
