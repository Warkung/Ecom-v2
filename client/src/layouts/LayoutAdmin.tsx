import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/navbar/SidebarAdmin";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function LayoutAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <SidebarAdmin isOpen={isSidebarOpen} />
      <main className="flex-1 overflow-y-auto p-6">
        {/* toggle button for show and hidden sidebarAdmin */}
        <button
          onClick={toggleSidebar}
          className=" fixed top-4 right-4 z-30 mb-4 inline-flex items-center rounded-lg bg-gray-200 p-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 md:hidden"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Outlet />
      </main>
    </div>
  );
}
