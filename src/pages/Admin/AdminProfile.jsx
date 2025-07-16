






// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import TagList from "../Dashboard/TagList";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// const AdminProfile = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const queryClient = useQueryClient(); // <-- for refetching tags
//   const [tagInput, setTagInput] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const { data: stats = {}, isLoading } = useQuery({
//     queryKey: ["adminStats", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/admin/stats?email=${user?.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   const handleAddTag = async (e) => {
//     e.preventDefault();
//     const tag = tagInput.trim();
//     if (!tag) return;

//     try {
//       const res = await axiosSecure.post("/tags", { tag });
//       if (res.data.insertedId) {
//         setSuccess("✅ Tag added successfully!");
//         setError("");
//         setTagInput("");

//         queryClient.invalidateQueries(["tags"]); // ✅ refresh tag list
//       }
//     } catch (err) {
//       if (err.response?.status === 409) {
//         setError("⚠️ Tag already exists.");
//       } else {
//         setError("❌ Failed to add tag.");
//       }
//       setSuccess("");
//     }
//   };

//   const pieData = [
//     { name: "Posts", value: stats.totalPosts || 0 },
//     { name: "Comments", value: stats.totalComments || 0 },
//     { name: "Users", value: stats.totalUsers || 0 },
//   ];

//   if (isLoading) return <p className="text-center p-10 text-white">Loading...</p>;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8 text-white">
//       {/* Admin Info */}
//       <div className="flex items-center gap-6 mb-8">
//         <img
//           src={user?.photoURL || stats.image}
//           alt="Admin"
//           className="w-20 h-20 rounded-full border"
//         />
//         <div>
//           <h2 className="text-2xl font-bold">{user?.displayName || stats.name}</h2>
//           <p className="text-gray-300">{user?.email || stats.email}</p>
//           <p>Total Posts: {stats.totalPosts || 0}</p>
//           <p>Total Comments: {stats.totalComments || 0}</p>
//           <p>Total Users: {stats.totalUsers || 0}</p>
//         </div>
//       </div>

//       {/* Pie Chart */}
//       <div className="bg-gray-800 p-4 rounded shadow mb-8">
//         <h3 className="text-xl font-bold mb-4">📊 Site Statistics</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               dataKey="value"
//               data={pieData}
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               label
//             >
//               {pieData.map((_, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Add Tag Form */}
//       <form
//         onSubmit={handleAddTag}
//         className="bg-gray-900 p-4 rounded shadow mb-6"
//       >
//         <h3 className="text-xl font-bold mb-4">🏷️ Add New Tag</h3>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             value={tagInput}
//             onChange={(e) => setTagInput(e.target.value)}
//             className="input input-bordered w-full text-black"
//             placeholder="Enter new tag"
//           />
//           <button className="btn btn-primary" type="submit">
//             Add
//           </button>
//         </div>
//         {success && <p className="text-green-400 mt-2">{success}</p>}
//         {error && <p className="text-red-400 mt-2">{error}</p>}
//       </form>

//       {/* Tag List */}
//       <TagList />
//     </div>
//   );
// };

// export default AdminProfile;





import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import TagList from "../Dashboard/TagList";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B"]; // Updated colors for modern look

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["adminStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/stats?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleAddTag = async (e) => {
    e.preventDefault();
    const tag = tagInput.trim();
    if (!tag) return;

    try {
      const res = await axiosSecure.post("/tags", { tag });
      if (res.data.insertedId) {
        setSuccess("✅ Tag added successfully!");
        setError("");
        setTagInput("");
        queryClient.invalidateQueries(["tags"]);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError("⚠️ Tag already exists.");
      } else {
        setError("❌ Failed to add tag.");
      }
      setSuccess("");
    }
  };

  const pieData = [
    { name: "Posts", value: stats.totalPosts || 0 },
    { name: "Comments", value: stats.totalComments || 0 },
    { name: "Users", value: stats.totalUsers || 0 },
  ];

  if (isLoading) return <p className="text-center p-10 text-white">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      {/* 🔹 Admin Info */}
      <div className="flex items-center gap-6 bg-gray-800 p-6 rounded-2xl shadow-lg mb-8">
        <img
          src={user?.photoURL || stats.image}
          alt="Admin"
          className="w-20 h-20 rounded-full border-2 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.displayName || stats.name}</h2>
          <p className="text-gray-400">{user?.email || stats.email}</p>
          <div className="mt-2 space-y-1">
            <p>Total Posts: <span className="font-semibold text-blue-400">{stats.totalPosts || 0}</span></p>
            <p>Total Comments: <span className="font-semibold text-green-400">{stats.totalComments || 0}</span></p>
            <p>Total Users: <span className="font-semibold text-yellow-400">{stats.totalUsers || 0}</span></p>
          </div>
        </div>
      </div>

      {/* 📊 Pie Chart */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg mb-10">
        <h3 className="text-2xl font-semibold mb-6 text-center">📊 Site Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🏷️ Add New Tag */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-10">
        <h3 className="text-xl font-bold mb-4">🏷️ Add New Tag</h3>
        <form onSubmit={handleAddTag} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="input input-bordered w-full text-black"
            placeholder="Enter new tag"
          />
          <button className="btn btn-primary w-full md:w-auto" type="submit">
            Add Tag
          </button>
        </form>
        {success && <p className="text-green-400 mt-2">{success}</p>}
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </div>

      {/* 🔖 Tag List */}
      <TagList />
    </div>
  );
};

export default AdminProfile;


