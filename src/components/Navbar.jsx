


// import { Link, NavLink } from 'react-router'; // ✅ Use from 'react-router-dom' instead of 'react-router'
// import { FaBell } from "react-icons/fa";
// import useAuth from '../hooks/useAuth';

// const Navbar = () => {
//   const { user, logOut } = useAuth()

//   const handleLogout = async () => {
//     try {
//       await logOut();
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

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
//           <FaBell className="text-xl" />
//           {/* You can dynamically show count if available */}
//           <span className="badge badge-sm badge-error absolute -top-2 -right-2">1</span>
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





import { Link, NavLink } from "react-router"; // ✅ Fixed import
import { FaBell } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

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

  // ✅ Fetch announcement count
  const { data: countData } = useQuery({
    queryKey: ["announcementCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements/count");
      return res.data;
    },
  });

  const navItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/membership">Membership</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* START */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">Online Forum</Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems}
        </ul>
      </div>

      {/* END */}
      <div className="navbar-end flex items-center gap-4">
        {/* 🔔 Notification */}
        <div className="relative">
          <FaBell className="text-xl" />
          {countData?.count > 0 && (
            <span className="badge badge-sm badge-error absolute -top-2 -right-2">
              {countData.count}
            </span>
          )}
        </div>

        {/* 🔐 Auth Check */}
        {!user ? (
          <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL || "https://i.ibb.co/2n2RM3K/avatar.png"} />
              </div>
            </div>
            <ul tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><p className="font-semibold">{user?.displayName}</p></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

