


// // import { useEffect, useState } from "react";
// // import useAuth from "../../hooks/useAuth";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// // import PostCard from "../../components/PostCard";


// // const MyPost = () => {
// //   const { user } = useAuth();
// //   const axiosSecure = useAxiosSecure();
// //   const [posts, setPosts] = useState([]);

// //   useEffect(() => {
// //     const fetchMyPosts = async () => {
// //       const res = await axiosSecure.get(`/posts?email=${user?.email}`);
// //       setPosts(res.data || []);
// //     };

// //     if (user?.email) {
// //       fetchMyPosts();
// //     }
// //   }, [user, axiosSecure]);

// //   return (
// //     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
//     const fetchMyPosts = async () => {
//       try {
//         const res = await axiosSecure.get(`/posts?email=${user?.email}`);
//         setPosts(res.data || []);
//       } catch (err) {
//         console.error("Error fetching user's posts:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) {
//       fetchMyPosts();
//     }
//   }, [user, axiosSecure]);

//   if (loading) return <div className="text-center mt-10">Loading your posts...</div>;

//   if (posts.length === 0) {
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



import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PostCard from "../../components/PostCard";

const MyPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axiosSecure.get(`/posts?email=${user?.email}`);
        console.log("My Posts API Response:", res.data);

        // Check if response has 'posts' field or is directly array
        if (Array.isArray(res.data)) {
          setPosts(res.data); // direct array
        } else if (Array.isArray(res.data.posts)) {
          setPosts(res.data.posts); // object with posts field
        } else {
          setPosts([]); // fallback
        }

      } catch (err) {
        console.error("Error fetching user's posts:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchMyPosts();
    }
  }, [user, axiosSecure]);

  if (loading) {
    return <div className="text-center mt-10">Loading your posts...</div>;
  }

  if (!posts.length) {
    return <div className="text-center mt-10 text-gray-500">You haven't added any posts yet.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default MyPost;
