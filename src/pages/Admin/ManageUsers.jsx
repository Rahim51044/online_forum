import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
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
      return await axiosSecure.patch(`/users/make-admin/${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users", search]);
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* 🔍 Search */}
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
          <table className="table w-full bg-white rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subscription</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isMember ? (
                      <span className="badge badge-success">Member</span>
                    ) : (
                      <span className="badge badge-ghost">Free</span>
                    )}
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <span className="badge badge-info">Admin</span>
                    ) : (
                      <button
                        onClick={() => makeAdmin(user._id)}
                        className="btn btn-sm btn-outline"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
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
