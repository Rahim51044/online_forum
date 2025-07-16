





// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// const MyPosts = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: posts = [], refetch } = useQuery({
//     queryKey: ["user-posts", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/posts/user?email=${user.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   const handleDelete = async (postId) => {
//     if (!window.confirm("Are you sure you want to delete this post?")) return;
//     try {
//       await axiosSecure.delete(`/posts/${postId}`);
//       refetch();
//     } catch (err) {
//       alert("Failed to delete post");
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto text-white">
//       <h2 className="text-3xl font-bold mb-4">My Posts</h2>
//       <table className="table w-full bg-gray-800 rounded">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Votes</th>
//             <th>Comments</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//           {posts.length === 0 && (
//             <tr>
//               <td colSpan="4" className="text-center py-4">
//                 No posts found.
//               </td>
//             </tr>
//           )}
//           {posts.map((post) => (
//             <tr key={post._id}>
//               <td>{post.title}</td>
//               <td>{(post.upVote || 0) - (post.downVote || 0)}</td>
//               <td>
               
//                 {/* <button
//                   onClick={() => navigate(`/comments/${post._id}`)}
//                   className="btn btn-sm btn-info"
//                 >
//                   Comments
//                 </button> */}
//                 <Link to={`/comments/${post._id}`} className="btn btn-sm btn-info">Comments</Link>

//               </td>
//               <td>
//                 <button
//                   onClick={() => handleDelete(post._id)}
//                   className="btn btn-sm btn-error"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MyPosts;





import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; // ✅ corrected import
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const MyPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-posts", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/posts/user?email=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  const posts = data.posts || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axiosSecure.delete(`/posts/${postId}`);
      refetch();
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  if (isLoading) return <p className="text-white text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">My Posts</h2>
      <table className="table w-full bg-gray-800 rounded">
        <thead>
          <tr>
            <th>Title</th>
            <th>Votes</th>
            <th>Comments</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No posts found.
              </td>
            </tr>
          )}
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{(post.upVote || 0) - (post.downVote || 0)}</td>
              <td>
                <Link to={`/comments/${post._id}`} className="btn btn-sm btn-info">
                  Comments
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Pagination Footer */}
      <div className="mt-4 flex justify-center space-x-2 flex-wrap">
        {[...Array(totalPages).keys()].map((i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-blue-500" : "bg-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
