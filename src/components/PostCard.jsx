


// import { FaArrowUp, FaArrowDown } from "react-icons/fa";
// import { Link } from "react-router";
// import { FacebookShareButton } from "react-share";

// const PostCard = ({ post }) => {
//   const {
//     _id,
//     authorImage,
//     authorName,
//     title,
//     description,
//     tag,
//     upVote = 0,
//     downVote = 0,
//     createdAt,
//     commentCount = 0,
//   } = post;

//   const date = new Date(createdAt).toLocaleDateString();
//   const voteDiff = upVote - downVote;
//   const tags = Array.isArray(tag) ? tag : tag ? [tag] : [];

//   return (
//     <div className="bg-gray-900 text-white rounded-xl shadow-md border border-gray-800 p-5 flex flex-col justify-between
//       min-h-[380px] max-h-[420px] sm:min-h-[400px] sm:max-h-[440px] md:min-h-[420px] md:max-h-[460px] 
//       overflow-hidden transition-all duration-300">

//       {/* Top Section */}
//       <div className="flex flex-col gap-2 flex-grow overflow-hidden">
//         {/* Author */}
//         <div className="flex items-center gap-3">
//           <img
//             src={authorImage}
//             alt="author"
//             className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
//           />
//           <div>
//             <h4 className="font-semibold text-base">{authorName}</h4>
//             <p className="text-sm text-gray-400">{date}</p>
//           </div>
//         </div>

//         {/* Title */}
//         <h3 className="font-bold text-blue-400 text-base sm:text-lg md:text-xl line-clamp-2 leading-tight">
//           {title}
//         </h3>

//         {/* Description */}
//         <p className="text-gray-300 text-sm sm:text-base line-clamp-3 flex-grow">
//           {description}
//         </p>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 text-xs">
//           {tags.length > 0 ? (
//             tags.map((t, i) => (
//               <span key={i} className="bg-blue-600 text-white px-2 py-0.5 rounded-full">
//                 #{t}
//               </span>
//             ))
//           ) : (
//             <span className="text-gray-500 italic">No tags</span>
//           )}
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t border-gray-700 pt-3 text-sm">
//         <div className="flex gap-3 flex-wrap items-center">
//           <span className="flex items-center gap-1 text-green-400">
//             <FaArrowUp /> {upVote}
//           </span>
//           <span className="flex items-center gap-1 text-red-400">
//             <FaArrowDown /> {downVote}
//           </span>
//           <span className="text-yellow-400">🔥 {voteDiff}</span>
//           <span>💬 {commentCount}</span>
//         </div>

//         <div className="flex gap-2 flex-wrap">
//           <Link
//             to={`/post/${_id}`}
//             className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
//           >
//             View
//           </Link>
//           <FacebookShareButton url={`${window.location.origin}/post/${_id}`} quote={title}>
//             <button className="btn btn-sm btn-outline text-blue-400 border-blue-600 hover:bg-blue-800">
//               Share
//             </button>
//           </FacebookShareButton>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCard;




import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router";
import {
  FacebookShareButton,
  FacebookIcon
} from "react-share";

const PostCard = ({ post }) => {
  const {
    _id,
    authorImage,
    authorName,
    title,
    description,
    tag,
    upVote = 0,
    downVote = 0,
    createdAt,
    commentCount = 0,
    authorRole, // Optional, for showing badge later
    membership, // Optional, for showing gold/bronze badge
  } = post;

  const date = new Date(createdAt).toLocaleDateString();
  const voteDiff = upVote - downVote;
  const tags = Array.isArray(tag) ? tag : tag ? [tag] : [];

  const shareUrl = `${window.location.origin}/post/${_id}`;

  // Badge (Optional logic)
  const getBadge = () => {
    if (membership === "gold") {
      return <span className="text-yellow-300 font-semibold text-xs">(Gold Badge)</span>;
    } else if (membership === "bronze") {
      return <span className="text-amber-600 font-semibold text-xs">(Bronze Badge)</span>;
    }
    return null;
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-md border border-gray-800 p-5 flex flex-col justify-between
      min-h-[420px] max-h-[460px] overflow-hidden transition-all duration-300">

      {/* Top Section */}
      <div className="flex flex-col gap-2 flex-grow overflow-hidden">
        {/* Author Info */}
        <div className="flex items-center gap-3">
          <img
            src={authorImage}
            alt="author"
            className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
          />
          <div>
            <h4 className="font-semibold text-base flex items-center gap-1">
              {authorName} {getBadge()}
            </h4>
            <p className="text-sm text-gray-400">{date}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-blue-400 text-lg md:text-xl line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs mt-1">
          {tags.length > 0 ? (
            tags.map((t, i) => (
              <span key={i} className="bg-blue-600 text-white px-2 py-0.5 rounded-full">
                #{t}
              </span>
            ))
          ) : (
            <span className="text-gray-500 italic">No tags</span>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t border-gray-700 pt-3 text-sm">
        <div className="flex gap-3 flex-wrap items-center">
          <span className="flex items-center gap-1 text-green-400">
            <FaArrowUp /> {upVote}
          </span>
          <span className="flex items-center gap-1 text-red-400">
            <FaArrowDown /> {downVote}
          </span>
          <span className="text-yellow-400">🔥 {voteDiff}</span>
          <span>💬 {commentCount}</span>
        </div>

        <div className="flex gap-2 flex-wrap items-center">
          <Link
            to={`/post/${_id}`}
            className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            View
          </Link>

          {/* Facebook Share */}
          <FacebookShareButton url={shareUrl} quote={title} hashtag="#OnlineForum">
            <div className="btn btn-sm btn-outline text-blue-400 border-blue-600 hover:bg-blue-800 flex items-center gap-1">
              <FacebookIcon size={20} round /> Share
            </div>
          </FacebookShareButton>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
