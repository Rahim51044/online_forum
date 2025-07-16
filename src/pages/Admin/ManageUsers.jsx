


// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const ManageUsers = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const [search, setSearch] = useState("");

//   // 🔍 Server-side search query
//   const { data: users = [], isLoading } = useQuery({
//     queryKey: ["users", search],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users?search=${search}`);
//       return res.data;
//     },
//   });

//   // 🔁 Make Admin Mutation
//   const { mutate: makeAdmin } = useMutation({
//     mutationFn: async (userId) => {
//       return await axiosSecure.patch(`/users/make-admin/${userId}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users", search]);
//     },
//   });

//   // 🔁 Remove Admin Mutation
//   const { mutate: removeAdmin } = useMutation({
//     mutationFn: async (userId) => {
//       return await axiosSecure.patch(`/users/remove-admin/${userId}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users", search]);
//     },
//   });

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

//       {/* 🔍 Search */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by username"
//           className="input input-bordered w-full max-w-xs"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full bg-green-300 rounded-lg">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Subscription</th>
//                 <th>Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, idx) => (
//                 <tr key={user._id}>
//                   <td>{idx + 1}</td>
//                   <td>{user.name || user.displayName || "N/A"}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     {user.membership === "gold" ? (
//                       <span className="badge badge-warning">Gold Member</span>
//                     ) : (
//                       <span className="badge badge-ghost">Free</span>
//                     )}
//                   </td>
//                   <td>
//                     {user.role === "admin" ? (
//                       <button
//                         onClick={() => removeAdmin(user._id)}
//                         className="btn btn-sm btn-outline btn-error"
//                       >
//                         Remove Admin
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => makeAdmin(user._id)}
//                         className="btn btn-sm btn-outline"
//                       >
//                         Make Admin
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//               {users.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4 text-gray-500">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;





// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";

// const ManageUsers = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const { user: loggedInUser } = useAuth(); // 🔐 logged in user info
//   const [search, setSearch] = useState("");

//   // 🔍 Server-side search query
//   const { data: users = [], isLoading } = useQuery({
//     queryKey: ["users", search],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users?search=${search}`);
//       return res.data;
//     },
//   });

//   // 🔁 Make Admin Mutation (only for owner)
//   const { mutate: makeAdmin } = useMutation({
//     mutationFn: async (userId) => {
//       return await axiosSecure.patch(`/users/make-admin/${userId}`, null, {
//         headers: { email: loggedInUser?.email }, // ✅ send loggedIn email
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users", search]);
//     },
//   });

//   // 🔁 Remove Admin Mutation (only for owner)
//   const { mutate: removeAdmin } = useMutation({
//     mutationFn: async (userId) => {
//       return await axiosSecure.patch(`/users/remove-admin/${userId}`, null, {
//         headers: { email: loggedInUser?.email }, // ✅ send loggedIn email
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users", search]);
//     },
//   });

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

//       {/* 🔍 Search */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by username"
//           className="input input-bordered w-full max-w-xs"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full bg-green-300 rounded-lg">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Subscription</th>
//                 <th>Role</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, idx) => (
//                 <tr key={user._id}>
//                   <td>{idx + 1}</td>
//                   <td>{user.name || user.displayName || "N/A"}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     {user.membership === "gold" ? (
//                       <span className="badge badge-warning">Gold Member</span>
//                     ) : (
//                       <span className="badge badge-ghost">Free</span>
//                     )}
//                   </td>
//                   <td>
//                     {user.role === "owner" ? (
//                       <span className="font-bold text-purple-600">Owner</span>
//                     ) : user.role === "admin" ? (
//                       <span className="text-blue-600">Admin</span>
//                     ) : (
//                       <span>User</span>
//                     )}
//                   </td>
//                   <td>
//                     {/* ✅ Only show buttons if logged-in user is owner AND target user is NOT owner */}
//                     {loggedInUser?.role === "owner" && user.role !== "owner" && (
//                       <>
//                         {user.role === "admin" ? (
//                           <button
//                             onClick={() => removeAdmin(user._id)}
//                             className="btn btn-sm btn-outline btn-error"
//                           >
//                             Remove Admin
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => makeAdmin(user._id)}
//                             className="btn btn-sm btn-outline"
//                           >
//                             Make Admin
//                           </button>
//                         )}
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//               {users.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="text-center py-4 text-gray-500">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;






import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole"; // ✅ import useRole

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user: loggedInUser } = useAuth();
  const { role: loggedInRole, loading: roleLoading } = useRole(loggedInUser?.email); // ✅ get actual role
  const [search, setSearch] = useState("");

  // 🔍 Server-side search query
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });

  // 🔁 Make Admin Mutation
  const { mutate: makeAdmin } = useMutation({
    mutationFn: async (userId) => {
      return await axiosSecure.patch(`/users/make-admin/${userId}`, null, {
        headers: { email: loggedInUser?.email },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users", search]);
    },
  });

  // 🔁 Remove Admin Mutation
  const { mutate: removeAdmin } = useMutation({
    mutationFn: async (userId) => {
      return await axiosSecure.patch(`/users/remove-admin/${userId}`, null, {
        headers: { email: loggedInUser?.email },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users", search]);
    },
  });

  if (roleLoading) return <p className="text-center py-10">Loading role...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username"
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-green-300 rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subscription</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.name || user.displayName || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.membership === "gold" ? (
                      <span className="badge badge-warning">Gold Member</span>
                    ) : (
                      <span className="badge badge-ghost">Free</span>
                    )}
                  </td>
                  <td>
                    {user.role === "owner" ? (
                      <span className="font-bold text-purple-600">Owner</span>
                    ) : user.role === "admin" ? (
                      <span className="text-blue-600">Admin</span>
                    ) : (
                      <span>User</span>
                    )}
                  </td>
                  <td>
                    {/* ✅ Owner can manage others (not self or other owners) */}
                    {loggedInRole === "owner" && user.role !== "owner" && (
                      <>
                        {user.role === "admin" ? (
                          <button
                            onClick={() => removeAdmin(user._id)}
                            className="btn btn-sm btn-outline btn-error"
                          >
                            Remove Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => makeAdmin(user._id)}
                            className="btn btn-sm btn-outline"
                          >
                            Make Admin
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
