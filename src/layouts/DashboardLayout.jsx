







import { Link, NavLink, Outlet } from "react-router";
import {
  FaUser,
  FaPlus,
  FaClipboardList,
  FaUsersCog,
  FaBullhorn,
  FaExclamationTriangle,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role, loading } = useRole(user?.email);

  if (loading) return <p className="p-10 text-center">Loading Dashboard...</p>;

  const isAdminOrOwner = role === "admin" || role === "owner";

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <Link to="/">
          <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        </Link>

        <nav className="space-y-4">
          {/* ✅ Accessible by all users */}
          <p className="text-3xl font-bold text-center text-green-600">user</p>
          <NavLink
            to="myProfile"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
            
          >
            <FaUser /> My Profile
          </NavLink>

          <NavLink
            to="addPost"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <FaPlus /> Add Post
          </NavLink>

          <NavLink
            to="myPost"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <FaClipboardList /> My Posts
          </NavLink>

          <NavLink
            to="warn-history"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
          >
            ⚠️ Warn History
          </NavLink>

          {/* ✅ Admin or Owner routes */}

          {isAdminOrOwner && (
            <>
              <hr className="border-gray-700 my-4" />
              <p className="text-3xl font-bold text-center text-green-600">Admin</p>

              <NavLink
                to="adminProfile"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800 ${
                    isActive ? "bg-gray-800" : ""
                  }`
                }
              >
                <FaUser /> Admin Profile
              </NavLink>

              <NavLink
                to="manageUsers"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800 ${
                    isActive ? "bg-gray-800" : ""
                  }`
                }
              >
                <FaUsersCog /> Manage Users
              </NavLink>

              <NavLink
                to="announcement"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800 ${
                    isActive ? "bg-gray-800" : ""
                  }`
                }
              >
                <FaBullhorn /> Announcement
              </NavLink>

              <NavLink
                to="reported"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800 ${
                    isActive ? "bg-gray-800" : ""
                  }`
                }
              >
                <FaExclamationTriangle /> Reported
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-700 p-6 text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
