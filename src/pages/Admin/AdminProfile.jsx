// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import TagList from "../Dashboard/TagList";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// const AdminProfile = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [tagInput, setTagInput] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const { data: stats = {}, refetch } = useQuery({
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
//       }
//     } catch (err) {
//       console.error("Failed to add tag", err);
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

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8 text-white">
//       {/* Admin Profile Info */}
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

//       {/* Pie Chart Section */}
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

//       {/* Add Tag Section */}
//       <form
//         onSubmit={handleAddTag}
//         className="bg-gray-900 p-4 rounded shadow"
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

//         {/* Feedback messages */}
//         {success && <p className="text-green-400 mt-2">{success}</p>}
//         {error && <p className="text-red-400 mt-2">{error}</p>}
//       </form>
//       <TagList></TagList>
//     </div>
//   );
// };

// export default AdminProfile;





import { useQuery } from "@tanstack/react-query";
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
import useRole from "../../hooks/useRole"; // <-- role হুক ইম্পোর্ট করো
import TagList from "../Dashboard/TagList";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role, loading } = useRole(user?.email); // role + loading নেওয়া

  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    data: stats = {},
    refetch,
    isLoading: statsLoading,
  } = useQuery({
    queryKey: ["adminStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/stats?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // role loading হলে spinner বা loading দেখাও
  if (loading || statsLoading)
    return <p className="p-10 text-center text-white">Loading...</p>;

  // tag add করার ফাংশন (শুধুমাত্র owner-এর জন্য)
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
        refetch(); // ট্যাগ লিস্ট রিফ্রেশ করতে চাইলে
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-white">
      {/* Profile Info */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user?.photoURL || stats.image}
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.displayName || stats.name}</h2>
          <p className="text-gray-300">{user?.email || stats.email}</p>
          <p>Total Posts: {stats.totalPosts || 0}</p>
          <p>Total Comments: {stats.totalComments || 0}</p>
          <p>Total Users: {stats.totalUsers || 0}</p>
          <p className="mt-2 font-semibold">
            Role:{" "}
            <span
              className={`${
                role === "owner"
                  ? "text-purple-500"
                  : role === "admin"
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            >
              {role?.toUpperCase() || "USER"}
            </span>
          </p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-gray-800 p-4 rounded shadow mb-8">
        <h3 className="text-xl font-bold mb-4">📊 Site Statistics</h3>
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Tag Add Form - Only Owner */}
      {role === "owner" && (
        <form
          onSubmit={handleAddTag}
          className="bg-gray-900 p-4 rounded shadow mb-6"
        >
          <h3 className="text-xl font-bold mb-4">🏷️ Add New Tag</h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="input input-bordered w-full text-black"
              placeholder="Enter new tag"
            />
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </div>

          {/* Success/Error Message */}
          {success && <p className="text-green-400 mt-2">{success}</p>}
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </form>
      )}

      {/* Tag List (Everyone Can See) */}
      <TagList />
    </div>
  );
};

export default AdminProfile;
