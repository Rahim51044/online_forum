// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const MakeAdmin = () => {
//   const axiosSecure = useAxiosSecure();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all users
//   const fetchUsers = async () => {
//     try {
//       const res = await axiosSecure.get("/users");
//       setUsers(res.data || []);
//     } catch (error) {
//       console.error("Failed to load users", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Handle making admin
//   const handleMakeAdmin = async (userId, currentRole) => {
//     if (currentRole === "admin") return;

//     try {
//       const confirm = await Swal.fire({
//         title: "Are you sure?",
//         text: "You are about to make this user an admin.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, make admin",
//       });

//       if (confirm.isConfirmed) {
//         const res = await axiosSecure.patch(`/users/${userId}/role`, {
//           role: "admin",
//         });

//         if (res.data.modifiedCount > 0) {
//           Swal.fire("Success!", "User is now an admin.", "success");
//           fetchUsers(); // Refresh the list
//         } else {
//           Swal.fire("Info", "User was already an admin.", "info");
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to update role.", "error");
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading users...</p>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded">
//           <thead className="bg-orange-300">
//             <tr>
//               <th className="py-2 px-4 text-left">#</th>
//               <th className="py-2 px-4 text-left">Name</th>
//               <th className="py-2 px-4 text-left">Email</th>
//               <th className="py-2 px-4 text-left">Role</th>
//               <th className="py-2 px-4 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user._id} className="border-t">
//                 <td className="py-2 px-4">{index + 1}</td>
//                 <td className="py-2 px-4">{user.name}</td>
//                 <td className="py-2 px-4">{user.email}</td>
//                 <td className="py-2 px-4 capitalize">{user.role}</td>
//                 <td className="py-2 px-4">
//                   <button
//                     onClick={() => handleMakeAdmin(user._id, user.role)}
//                     disabled={user.role === "admin"}
//                     className={`px-3 py-1 rounded ${
//                       user.role === "admin"
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-green-600 hover:bg-green-700 text-white"
//                     }`}
//                   >
//                     {user.role === "admin" ? "Admin" : "Make Admin"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MakeAdmin;
