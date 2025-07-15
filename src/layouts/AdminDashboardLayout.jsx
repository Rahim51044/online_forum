// src/layouts/AdminDashboardLayout.jsx
import { Link, Outlet } from "react-router";
import { FaUserShield, FaBullhorn, FaUsers, FaFlag } from "react-icons/fa";

const AdminDashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <nav className="space-y-2">
          <Link to="/dashboard" className="flex items-center gap-2 hover:text-blue-300">
            <FaUserShield /> Admin Profile
          </Link>
          <Link to="/dashboard/manage-users" className="flex items-center gap-2 hover:text-blue-300">
            <FaUsers /> Manage Users
          </Link>
          <Link to="/dashboard/make-announcement" className="flex items-center gap-2 hover:text-blue-300">
            <FaBullhorn /> Make Announcement
          </Link>
          <Link to="/dashboard/reported-activities" className="flex items-center gap-2 hover:text-blue-300">
            <FaFlag /> Reported Activities
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardLayout;