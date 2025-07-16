





// import { Link, NavLink } from "react-router"; // ✅ Fixed import
// import { FaBell } from "react-icons/fa";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../hooks/useAuth";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import NotificationIcon from "../pages/Dashboard/NotificationIcon";

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const handleLogout = async () => {
//     try {
//       await logOut();
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   // ✅ Fetch announcement count
//   const { data: countData } = useQuery({
//     queryKey: ["announcementCount"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/announcements/count");
//       return res.data;
//     },
//   });

//   const navItems = (
//     <>
//       <li><NavLink to="/">Home</NavLink></li>
//       <li><NavLink to="/membership">Membership</NavLink></li>
//     </>
//   );

//   return (
//     <div className="navbar bg-base-100 shadow-sm">
//       {/* START */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5" fill="none"
//               viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </div>
//           <ul tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
//             {navItems}
//           </ul>
//         </div>
//         <Link to="/" className="btn btn-ghost text-xl">Online Forum</Link>
//       </div>

//       {/* CENTER */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           {navItems}
//         </ul>
//       </div>

//       {/* END */}
//       <div className="navbar-end flex items-center gap-4">
//         {/* 🔔 Notification */}
//         <div className="relative">
         
//           <NotificationIcon></NotificationIcon>
//         </div>

//         {/* 🔐 Auth Check */}
//         {!user ? (
//           <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
//         ) : (
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full">
//                 <img src={user?.photoURL || "https://i.ibb.co/2n2RM3K/avatar.png"} />
//               </div>
//             </div>
//             <ul tabIndex={0}
//               className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//               <li><p className="font-semibold">{user?.displayName}</p></li>
//               <li><Link to="/dashboard">Dashboard</Link></li>
//               <li><button onClick={handleLogout}>Logout</button></li>
//             </ul>



//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;






import { Link, NavLink } from "react-router"; // ✅ Corrected import
import { FaBell } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import NotificationIcon from "../pages/Dashboard/NotificationIcon";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err.message);
    }
  };

  const { data: countData } = useQuery({
    queryKey: ["announcementCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements/count");
      return res.data;
    },
  });

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/membership"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "hover:text-blue-600"
          }
        >
          Membership
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-orange-300 shadow-md px-6 sticky top-0 z-50  ">
      {/* START */}
      <div className="navbar-start">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968860.png"
            alt="logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-semibold text-blue-700">Online Forum</span>
        </Link>

        {/* Mobile Menu */}
        <div className="dropdown ml-4">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
          >
            {navItems}
          </ul>
        </div>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navItems}</ul>
      </div>

      {/* END */}
      <div className="navbar-end flex items-center gap-4">
        {/* 🔔 Notification Icon */}
        <NotificationIcon />

        {/* 🔐 Auth */}
        {!user ? (
          <Link to="/login" className="btn btn-outline btn-sm">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/2n2RM3K/avatar.png"}
                  alt="user"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p className="font-semibold">{user?.displayName}</p>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;


