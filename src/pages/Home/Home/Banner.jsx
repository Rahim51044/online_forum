









// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const Banner = ({ onSearchResults }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const axiosSecure = useAxiosSecure();

//   // Fetch suggestions with debounce
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
//     }, 300);

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm, axiosSecure]);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!searchTerm.trim()) return;

//     try {
//       const res = await axiosSecure.get(`/posts/search?tag=${searchTerm}`);
//       onSearchResults(res.data || []);
//       setSuggestions([]);
//     } catch (err) {
//       console.error("Search failed:", err);
//     }
//   };

//   return (
//     <div className="relative bg-gray-900 text-white">
//       {/* Carousel Section */}
//       <div className="carousel w-full h-[400px]">
//         <div id="slide1" className="carousel-item relative w-full">
//           <img
//             src="https://assets.hongkiat.com/uploads/freelancers-why-join-online-forums/online-forum.jpg"
//             className="w-full object-cover"
//           />
//           <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
//             <a href="#slide3" className="btn btn-circle">❮</a>
//             <a href="#slide2" className="btn btn-circle">❯</a>
//           </div>
//         </div>

//         <div id="slide2" className="carousel-item relative w-full">
//           <img
//             src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
//             className="w-full object-cover"
//           />
//           <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
//             <a href="#slide1" className="btn btn-circle">❮</a>
//             <a href="#slide3" className="btn btn-circle">❯</a>
//           </div>
//         </div>

//         <div id="slide3" className="carousel-item relative w-full">
//           <img
//             src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1600&q=80"
//             className="w-full object-cover"
//           />
//           <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
//             <a href="#slide2" className="btn btn-circle">❮</a>
//             <a href="#slide1" className="btn btn-circle">❯</a>
//           </div>
//         </div>
//       </div>

//       {/* Search Section */}
//       <div className="bg-blue-600 py-10 px-4 text-center">
//         <h1 className="text-3xl md:text-4xl font-bold mb-4">Search Posts by Tag</h1>
//         <form onSubmit={handleSearch} className="max-w-md mx-auto flex">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search by tag..."
//               className="input input-bordered w-full rounded-l-md"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {suggestions.length > 0 && (
//               <ul className="absolute z-10 w-full bg-white text-black border rounded shadow mt-1 text-left max-h-48 overflow-y-auto">
//                 {suggestions.map((tag, i) => (
//                   <li
//                     key={i}
//                     className="px-3 py-1 hover:bg-blue-100 cursor-pointer"
//                     onClick={() => setSearchTerm(tag)}
//                   >
//                     {tag}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <button type="submit" className="btn btn-primary rounded-l-none">
//             Search
//           </button>
//         </form>
//       </div>
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

  // Fetch suggestions with debounce
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
    <div className="relative bg-gray-900 text-white -mt-5">
<div className="carousel w-full h-[400px]">
  {/* Slide 1 */}
  <div id="slide1" className="carousel-item relative w-full">
    <img
      src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1600&q=80"
      className="w-full object-cover"
      alt="Forum Slide 1"
    />
    <div className="absolute inset-0  bg-opacity-20 flex items-center justify-center">
      <h2 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
        Join the Conversation, Empower Your Voice
      </h2>
    </div>
    <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>

  {/* Slide 2 */}
  <div id="slide2" className="carousel-item relative w-full">
    <img
      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
      className="w-full object-cover"
      alt="Community Slide 2"
    />
    <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
      <h2 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
        Build Connections Through Posts & Replies
      </h2>
    </div>
    <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
      <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div>

  {/* Slide 3 */}
  <div id="slide3" className="carousel-item relative w-full">
    <img
      src="https://assets.hongkiat.com/uploads/freelancers-why-join-online-forums/online-forum.jpg"
      className="w-full object-cover"
      alt="Learning Slide 3"
    />
    <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
      <h2 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
        Learn, Share & Grow with the Community
      </h2>
    </div>
    <div className="absolute left-5 right-5 top-1/2 transform -translate-y-1/2 flex justify-between">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>

      {/* Search Section */}
      <div className="bg-blue-600 py-10 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Search Posts by Tag</h1>
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
              <ul className="absolute z-10 w-full bg-white text-black border rounded shadow mt-1 text-left max-h-48 overflow-y-auto">
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
    </div>
  );
};

export default Banner;
