



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
      return res.data.slice(0, 3);
    },
    enabled: !!user?.email,
  });

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">My Profile</h2>

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

      <div>
        <h3 className="text-2xl font-semibold mb-4">My Recent Posts</h3>
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <div key={post._id} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{post.title}</h2>
                  <p className="text-sm text-gray-400">Tag: #{post.tag}</p>
                  <p className="text-gray-100 whitespace-pre-line">{post.content}</p>
                  <div className="card-actions justify-end mt-4">
                    <span className="badge badge-outline">Comments: {post.commentCount || 0}</span>
                    <span className="badge badge-outline">UpVote: {post.upVote || 0}</span>
                    <span className="badge badge-outline">DownVote: {post.downVote || 0}</span>
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

