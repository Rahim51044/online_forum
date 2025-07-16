



// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import { FacebookShareButton, FacebookIcon } from "react-share";
// import Banner from "./Banner";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import PostCard from "../../../components/PostCard";

// const Home = () => {
//   const [page, setPage] = useState(1);
//   const [sortByPopularity, setSortByPopularity] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const axiosSecure = useAxiosSecure();

//   const { data = { posts: [], total: 0 }, isLoading } = useQuery({
//     queryKey: ["posts", page, sortByPopularity],
//     queryFn: async () => {
//       const endpoint = sortByPopularity ? "/posts/popular" : "/posts";
//       const res = await axiosSecure.get(`${endpoint}?page=${page}&limit=5`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       {/* 🔍 Banner input */}
//       <Banner onSearchResults={setSearchResults} />

//       {/* 🔍 Search Results */}
//       {searchResults.length > 0 && (
//         <div className="mt-10">
//           <h2 className="text-2xl font-bold mb-4">Search Results:</h2>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {searchResults.map((post) => (
//               <PostCard key={post._id} post={post} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* 📰 Default Post List */}
//       <div className="flex justify-between mb-6 mt-10">
//         <h2 className="text-3xl font-bold">Recent Posts</h2>
//         <button
//           onClick={() => setSortByPopularity(!sortByPopularity)}
//           className="btn btn-secondary"
//         >
//           Sort by Popularity
//         </button>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {data?.posts?.map((post) => (
//           <div key={post._id} className="card bg-base-100 p-4 shadow">
//             <div className="flex items-center gap-2 mb-2">
//               <img src={post.authorImage} className="w-8 h-8 rounded-full" alt="author" />
//               <span>{post.authorName}</span>
//               <span className="ml-auto text-sm text-gray-500">
//                 {new Date(post.createdAt).toLocaleString()}
//               </span>
//             </div>
//             <h3 className="text-lg font-semibold">{post.title}</h3>
//             <p className="text-sm mb-2">
//               {Array.isArray(post.tag) ? post.tag.join(", ") : post.tag}
//             </p>
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

//       {/* 📄 Pagination */}
//       <div className="mt-6 flex justify-center gap-2">
//         {[...Array(Math.ceil(data.total / 5)).keys()].map((num) => (
//           <button
//             key={num}
//             onClick={() => setPage(num + 1)}
//             className={`btn btn-sm ${page === num + 1 ? "btn-primary" : "btn-outline"}`}
//           >
//             {num + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;




import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Banner from "./Banner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PostCard from "../../../components/PostCard";
import TagsSection from "./TagsSection";


const Home = () => {
  const [page, setPage] = useState(1);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const axiosSecure = useAxiosSecure();

  const { data = { posts: [], total: 0 }, isLoading } = useQuery({
    queryKey: ["posts", page, sortByPopularity],
    queryFn: async () => {
      const endpoint = sortByPopularity ? "/posts/popular" : "/posts";
      const res = await axiosSecure.get(`${endpoint}?page=${page}&limit=5`);
      return res.data;
    },
  });

  // ট্যাগে ক্লিক করলে ঐ tag দিয়ে সার্চ করবে
  const handleTagClick = async (tag) => {
    try {
      const res = await axiosSecure.get(`/posts/search?tag=${tag}`);
      setSearchResults(res.data || []);
      setPage(1);
    } catch (error) {
      console.error("Tag search failed", error);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Banner onSearchResults={setSearchResults} />

      {/* Tag List Section */}
      <TagsSection onTagClick={handleTagClick} />

      {/* announment section */}
      {/* <AnnouncementSection></AnnouncementSection> */}
      {/* <MakeAnnouncement></MakeAnnouncement> */}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mt-10">
          <h2 className="text-5xl text-orange-500 text-center font-bold mb-4">Search Results:</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* Default Post List */}
      <div className=" mb-6 mt-10">
        <h2 className="text-5xl text-orange-500 text-center font-bold">Recent Posts</h2>
        <button 
          onClick={() => setSortByPopularity(!sortByPopularity)}
          className="btn btn-secondary flex justify-between mx-auto mt-5"
        >
          Sort by Popularity
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.posts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {[...Array(Math.ceil(data.total / 5)).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn btn-sm ${
              page === num + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
