// import React from 'react';
// import { Outlet } from 'react-router';

// const DashboardLayout = () => {
//     return (
//         <div>
//             dashboard
//             <Outlet></Outlet>
//         </div>
//     );
// };

// export default DashboardLayout;



import { Link, NavLink, Outlet } from "react-router";
import { FaUser, FaPlus, FaClipboardList } from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <Link to='/'><h2  className="text-2xl font-bold mb-6 text-center">Dashboard</h2></Link>
        <nav className="space-y-4">
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-700 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
