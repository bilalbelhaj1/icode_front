import { Outlet, Link } from "@tanstack/react-router";
import { Menu, Users, ScanLine, Calendar, X, Lock } from "lucide-react";
import { useState } from "react";
import logo from "../../public/logo.jpeg"

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 flex">
      
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static z-50 h-full
          bg-white/80 backdrop-blur-xl shadow-xl border-r border-emerald-100
          transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          w-64
        `}
      >
        
        <div className="flex items-center justify-between gap-3 p-4 border-b border-emerald-100">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Club Logo"
              className="w-10 h-10 rounded-2xl object-cover ring-2 ring-emerald-200"
            />
            <span className="font-bold text-lg bg-linear-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              ICode Club
            </span>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="p-3 space-y-2">
          <SidebarItem to="/dashboard/members" icon={<Users size={20} />} label="Members" />
          <SidebarItem to="/dashboard/scan" icon={<ScanLine size={20} />} label="Scanner" />
          <SidebarItem to="/dashboard/events" icon={<Calendar size={20} />} label="Events" />
          <SidebarItem to="/admin/reset-password" icon={<Lock/>} size={20} label="Reset Password" />
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-3">
          <div className="bg-linear-to-r from-red-600 to-red-500 text-white rounded-2xl p-3 text-center text-sm font-semibold shadow-lg">
            Logout
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-0 lg:ml-0">
        
        <header className="bg-white/70 backdrop-blur-xl border-b border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded-xl hover:bg-emerald-100 transition text-emerald-700"
            >
              <Menu />
            </button>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-800">
                  Bilal Belhaj
                </p>
                <p className="text-xs text-gray-500">Club Manager</p>
              </div>

              <img
                src="https://static.vecteezy.com/system/resources/previews/020/429/953/non_2x/admin-icon-vector.jpg"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full ring-2 ring-emerald-200"
              />
            </div>
          </div>
        </header>
        <main className="flex-1 min-h-0 overflow-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ to, icon, label }: any) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 transition text-gray-700 font-medium"
      activeProps={{ className: "bg-emerald-100 text-emerald-700 shadow-sm" }}
    >
      <div className="text-emerald-600 group-hover:scale-110 transition">
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
}