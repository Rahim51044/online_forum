// import { useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import PostCard from "../../../components/PostCard";

// const Banner = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const axiosSecure = useAxiosSecure(); // 🔐 Secure axios instance

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!searchTerm.trim()) return;

//     try {
//       const res = await axiosSecure.get(`/posts/search?tag=${searchTerm}`);
//       setSearchResults(res.data || []);
//     } catch (err) {
//       console.error("Search failed:", err);
//     }
//   };

//   return (
//     <div className="bg-blue-500 py-10 px-4 text-center">
//       <h1 className="text-3xl font-bold mb-4">Search Posts by Tag</h1>
//       <form onSubmit={handleSearch} className="max-w-md mx-auto flex">
//         <input
//           type="text"
//           placeholder="Search by tag..."
//           className="input input-bordered w-full rounded-l-md"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button type="submit" className="btn btn-primary rounded-l-none">
//           Search
//         </button>
//       </form>

//       {searchResults.length > 0 && (
//         <div className="mt-10">
//           <h2 className="text-xl font-semibold mb-4">Search Results:</h2>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {searchResults.map((post) => (
//               <PostCard key={post._id} post={post} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Banner;




// import { useEffect, useState } from "react";
// import PostCard from "../../../components/PostCard";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const Banner = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const axiosSecure = useAxiosSecure();

//   // 🔍 Fetch tag suggestions when typing
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       if (searchTerm.trim() === "") return setSuggestions([]);
//       try {
//         const res = await axiosSecure.get(`/tags/suggest?q=${searchTerm}`);
//         setSuggestions(res.data);
//       } catch (error) {
//         console.error("Suggestion error:", error);
//       }
//     };

//     const delayDebounce = setTimeout(() => {
//       fetchSuggestions();
//     }, 300); // debounce delay

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm, axiosSecure]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!searchTerm.trim()) return;
//     try {
//       const res = await axiosSecure.get(`/posts/search?tag=${searchTerm}`);
//       setSearchResults(res.data || []);
//       setSuggestions([]); // clear dropdown after search
//     } catch (err) {
//       console.error("Search failed:", err);
//     }
//   };

//   return (
//     <div className="bg-blue-500 py-10 px-4 text-center relative">
//       <h1 className="text-3xl font-bold mb-4">Search Posts by Tag</h1>
//       <form onSubmit={handleSearch} className="max-w-md mx-auto flex">
//         <div className="relative w-full">
//           <input
//             type="text"
//             placeholder="Search by tag..."
//             className="input input-bordered w-full rounded-l-md"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           {suggestions.length > 0 && (
//             <ul className="absolute z-10 w-full bg-white border rounded shadow mt-1 text-left">
//               {suggestions.map((tag, i) => (
//                 <li
//                   key={i}
//                   className="px-3 py-1 hover:bg-blue-100 cursor-pointer"
//                   onClick={() => setSearchTerm(tag)}
//                 >
//                   {tag}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <button type="submit" className="btn btn-primary rounded-l-none">
//           Search
//         </button>
//       </form>

//       {searchResults.length > 0 && (
//         <div className="mt-10">
//           <h2 className="text-xl font-semibold mb-4">Search Results:</h2>
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {searchResults.map((post) => (
//               <PostCard key={post._id} post={post} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Banner;






import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Banner = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const axiosSecure = useAxiosSecure();

  // 🔍 Fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim() === "") return setSuggestions([]);
      try {
        const res = await axiosSecure.get(`/tags/suggest?q=${searchTerm}`);
        setSuggestions(res.data);
      } catch (error) {
        console.error("Suggestion error:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, axiosSecure]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const res = await axiosSecure.get(`/posts/search?tag=${searchTerm}`);
      onSearchResults(res.data || []);
      setSuggestions([]);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="bg-blue-500 py-10 px-4 text-center relative">
      <h1 className="text-3xl font-bold mb-4">Search Posts by Tag</h1>
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by tag..."
            className="input input-bordered w-full rounded-l-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-green-500 border rounded shadow mt-1 text-left">
              {suggestions.map((tag, i) => (
                <li
                  key={i}
                  className="px-3 py-1 hover:bg-blue-100 cursor-pointer"
                  onClick={() => setSearchTerm(tag)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="btn btn-primary rounded-l-none">
          Search
        </button>
      </form>
    </div>
  );
};

export default Banner;
