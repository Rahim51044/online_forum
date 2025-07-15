


// // // import { useEffect, useState } from "react";
// // // import useAuth from "../../hooks/useAuth";
// // // import useAxiosSecure from "../../hooks/useAxiosSecure";
// // // import PostCard from "../../components/PostCard";


// // // const MyPost = () => {
// // //   const { user } = useAuth();
// // //   const axiosSecure = useAxiosSecure();
// // //   const [posts, setPosts] = useState([]);

// // //   useEffect(() => {
// // //     const fetchMyPosts = async () => {
// // //       const res = await axiosSecure.get(`/posts?email=${user?.email}`);
// // //       setPosts(res.data || []);
// // //     };

// // //     if (user?.email) {
// // //       fetchMyPosts();
// // //     }
// // //   }, [user, axiosSecure]);

// // //   return (
// // //     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// // //       {posts.map((post) => (
// // //         <PostCard key={post._id} post={post} />
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // export default MyPost;




// // import { useEffect, useState } from "react";
// // import useAuth from "../../hooks/useAuth";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// // import PostCard from "../../components/PostCard";


// // const MyPost = () => {
// //   const { user } = useAuth();
// //   const axiosSecure = useAxiosSecure();
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchMyPosts = async () => {
// //       try {
// //         const res = await axiosSecure.get(`/posts?email=${user?.email}`);
// //         setPosts(res.data || []);
// //       } catch (err) {
// //         console.error("Error fetching user's posts:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (user?.email) {
// //       fetchMyPosts();
// //     }
// //   }, [user, axiosSecure]);

// //   if (loading) return <div className="text-center mt-10">Loading your posts...</div>;

// //   if (posts.length === 0) {
// //     return <div className="text-center mt-10 text-gray-500">You haven't added any posts yet.</div>;
// //   }

// //   return (
// //     <div className="max-w-6xl mx-auto px-4 py-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //       {posts.map((post) => (
// //         <PostCard key={post._id} post={post} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default MyPost;



// import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import PostCard from "../../components/PostCard";

// const MyPost = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // const fetchMyPosts = async () => {
//     //   try {
//     //     const res = await axiosSecure.get(`/posts?email=${user?.email}`);
//     //     console.log("My Posts API Response:", res.data);

//     //     // Check if response has 'posts' field or is directly array
//     //     if (Array.isArray(res.data)) {
//     //       setPosts(res.data); // direct array
//     //     } else if (Array.isArray(res.data.posts)) {
//     //       setPosts(res.data.posts); // object with posts field
//     //     } else {
//     //       setPosts([]); // fallback
//     //     }

//     //   } catch (err) {
//     //     console.error("Error fetching user's posts:", err);
//     //     setPosts([]);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     const fetchMyPosts = async () => {
//   try {
//     const res = await axiosSecure.get(`/posts/user?email=${user?.email}`);
//     setPosts(res.data || []);
//   } catch (err) {
//     console.error("Error fetching user's posts:", err);
//     setPosts([]);
//   } finally {
//     setLoading(false);
//   }
// };


//     if (user?.email) {
//       fetchMyPosts();
//     }
//   }, [user, axiosSecure]);

//   if (loading) {
//     return <div className="text-center mt-10">Loading your posts...</div>;
//   }

//   if (!posts.length) {
//     return <div className="text-center mt-10 text-gray-500">You haven't added any posts yet.</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//       {posts.map((post) => (
//         <PostCard key={post._id} post={post} />
//       ))}
//     </div>
//   );
// };

// export default MyPost;






import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const MyPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: posts = [], refetch } = useQuery({
    queryKey: ["user-posts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/user?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axiosSecure.delete(`/posts/${postId}`);
      refetch();
    } catch (err) {
      alert("Failed to delete post");
    }
  };

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
               
                {/* <button
                  onClick={() => navigate(`/comments/${post._id}`)}
                  className="btn btn-sm btn-info"
                >
                  Comments
                </button> */}
                <Link to={`/comments/${post._id}`} className="btn btn-sm btn-info">Comments</Link>

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
    </div>
  );
};

export default MyPosts;
