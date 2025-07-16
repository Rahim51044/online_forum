



// // src/pages/MyProfile.jsx
// import { useQuery } from "@tanstack/react-query";

// import { FaMedal } from "react-icons/fa";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const MyProfile = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   // 🔄 Fetch user info with role & membership
//   const { data: userInfo = {} } = useQuery({
//     queryKey: ["user-info", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users?search=${user.email}`);
//       return res.data[0];
//     },
//     enabled: !!user?.email,
//   });

//   // 📄 Fetch 3 recent posts
//   const { data: posts = [] } = useQuery({
//     queryKey: ["recent-posts", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/posts/user?email=${user.email}&limit=3`
//       );
//       return res.data.slice(0, 3);
//     },
//     enabled: !!user?.email,
//   });

//   return (
//     <div className="p-6 max-w-4xl mx-auto text-white">
//       <h2 className="text-3xl font-bold mb-4">My Profile</h2>

//       {/* 👤 Profile Info */}
//       <div className="flex items-center gap-6 bg-gray-800 p-4 rounded-lg mb-6">
//         <img
//           src={user?.photoURL || "/avatar.png"}
//           alt="User Avatar"
//           className="w-20 h-20 rounded-full border"
//         />
//         <div>
//           <h3 className="text-xl font-semibold">{user?.displayName}</h3>
//           <p>{user?.email}</p>

//           {/* 🏅 Badges */}
//           <div className="mt-2 flex gap-2">
//             {userInfo?.membership === "gold" ? (
//               <span className="badge badge-warning flex items-center gap-1">
//                 <FaMedal /> Gold Badge
//               </span>
//             ) : (
//               <span className="badge badge-accent flex items-center gap-1">
//                 <FaMedal /> Bronze Badge
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 📝 Recent Posts */}
//       <div>
//         <h3 className="text-2xl font-semibold mb-4">My Recent Posts</h3>
//         {posts.length > 0 ? (
//           <div className="space-y-4">
//             {/* {posts.map((post) => (
//               <div key={post._id} className="bg-gray-800 p-4 rounded">
//                 <h4 className="text-lg font-bold">{post.title}</h4>
//                 <p className="text-sm text-gray-400">Tag: #{post.tag}</p>
//                 <p className="mt-1 line-clamp-2">{post.content}</p>
//               </div>
//             ))} */}
//             {posts.map((post) => (
//   <div key={post._id} className="bg-gray-800 p-4 rounded">
//     <h4 className="text-lg font-bold">{post.title}</h4>
//     <p className="text-sm text-gray-400 mb-1">Tag: #{post.tag}</p>
//     <p className="whitespace-pre-line">{post.content}</p>
//   </div>
// ))}
//           </div>
//         ) : (
//           <p className="text-gray-400">No posts yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;




// src/pages/MyProfile.jsx
import { useQuery } from "@tanstack/react-query";
import { FaMedal } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {} } = useQuery({
    queryKey: ["user-info", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${user.email}`);
      return res.data[0];
    },
    enabled: !!user?.email,
  });

  const { data: posts = [] } = useQuery({
    queryKey: ["recent-posts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/user?email=${user.email}&limit=3`);
      // backend e posts object এ থাকলে adjust করো, এখানে ধরে নিচ্ছি সরাসরি array
      return res.data.posts || res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">My Profile</h2>

      {/* Profile Info */}
      <div className="flex items-center gap-6 bg-gray-800 p-4 rounded-lg mb-6">
        <img
          src={user?.photoURL || "/avatar.png"}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h3 className="text-xl font-semibold">{user?.displayName}</h3>
          <p>{user?.email}</p>
          <div className="mt-2 flex gap-2">
            {userInfo?.membership === "gold" ? (
              <span className="badge badge-warning flex items-center gap-1">
                <FaMedal /> Gold Badge
              </span>
            ) : (
              <span className="badge badge-accent flex items-center gap-1">
                <FaMedal /> Bronze Badge
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">My Recent Posts</h3>
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="p-5">
                  <h2
                    className="text-2xl font-semibold mb-2 text-white truncate"
                    title={post.title}
                  >
                    {post.title}
                  </h2>
                  <p className="text-indigo-400 text-sm mb-2">Tag: #{post.tag}</p>
                  <p className="text-gray-300 mb-4 line-clamp-3 whitespace-pre-line">
                    {post.content || post.description || "No description available."}
                  </p>
                  <div className="flex justify-between items-center text-gray-400 text-sm font-medium">
                    <span>💬 {post.commentCount || 0} Comments</span>
                    <div className="flex space-x-3">
                      <span className="flex items-center gap-1 text-green-400">
                        👍 {post.upVote || 0}
                      </span>
                      <span className="flex items-center gap-1 text-red-400">
                        👎 {post.downVote || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
