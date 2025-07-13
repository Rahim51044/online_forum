








// // Updated HomePage.jsx without pagination feature
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import axios from "axios";
// import { FacebookShareButton, FacebookIcon } from "react-share";

// const Home = () => {
//   const [sortByPopularity, setSortByPopularity] = useState(false);

//   const { data, isLoading } = useQuery({
//     queryKey: ["posts", sortByPopularity],
//     queryFn: async () => {
//       const endpoint = sortByPopularity ? "/posts/popular" : "/posts";
//       const res = await axios.get(endpoint);
//       return res.data;
//     },
//   });

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-2xl font-bold">Forum Posts</h2>
//         <button
//           onClick={() => setSortByPopularity(!sortByPopularity)}
//           className="btn btn-secondary"
//         >
//           Sort by Popularity
//         </button>
//       </div>

//       <div className="grid gap-4">
//         {data?.posts?.map((post) => (
//           <div key={post._id} className="card bg-base-100 p-4 shadow">
//             <div className="flex items-center gap-2 mb-2">
//               <img src={post.authorImage} className="w-8 h-8 rounded-full" />
//               <span>{post.authorName}</span>
//               <span className="ml-auto text-sm text-gray-500">
//                 {new Date(post.createdAt).toLocaleString()}
//               </span>
//             </div>
//             <h3 className="text-lg font-semibold">{post.title}</h3>
//             <p className="text-sm mb-2">{post.tags.join(", ")}</p>
//             <div className="flex gap-4 text-sm">
//               <span>👍 {post.upVote}</span>
//               <span>👎 {post.downVote}</span>
//               <span>🔥 {post.upVote - post.downVote}</span>
//               <span>💬 {post.commentCount}</span>
//             </div>
//             <div className="flex justify-between mt-3">
//               <Link to={`/post/${post._id}`} className="btn btn-sm btn-primary">
//                 View Details
//               </Link>
//               <FacebookShareButton
//                 url={`${window.location.origin}/post/${post._id}`}
//                 quote={post.title}
//               >
//                 <FacebookIcon size={32} round />
//               </FacebookShareButton>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;




import { useEffect, useState } from "react";
import PostCard from "../../../components/PostCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosSecure.get("/posts"); // Your public API
      setPosts(res.data || []);
    };

    fetchPosts();
  }, [axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Recent Posts</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
