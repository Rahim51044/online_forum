




// // ✅ PostCard.jsx
// import { FaArrowUp, FaArrowDown } from "react-icons/fa";
// import { Link } from "react-router";
// import { FacebookShareButton, FacebookIcon } from "react-share";

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

//   return (
//     <div className="bg-base-100 p-4 rounded shadow hover:shadow-md transition">
//       <div className="flex items-center gap-3 mb-2">
//         <img src={authorImage} alt="author" className="w-10 h-10 rounded-full" />
//         <div>
//           <h4 className="font-semibold">{authorName}</h4>
//           <p className="text-sm text-gray-500">{date}</p>
//         </div>
//       </div>
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-gray-700 mb-2">{description?.slice(0, 100)}...</p>
//       <p className="text-sm mb-2">
//         {Array.isArray(tag) ? tag.join(", ") : tag ? `#${tag}` : "No Tag"}
//       </p>
//       <div className="flex items-center justify-between text-sm">
//         <div className="flex gap-3 items-center">
//           <span className="flex items-center gap-1 text-green-600">
//             <FaArrowUp /> {upVote}
//           </span>
//           <span className="flex items-center gap-1 text-red-500">
//             <FaArrowDown /> {downVote}
//           </span>
//           <span>🔥 {upVote - downVote}</span>
//           <span>💬 {commentCount}</span>
//         </div>
//         <div className="flex gap-2 items-center">
//           <Link to={`/post/${_id}`} className="btn btn-sm btn-primary">
//             View Details
//           </Link>
//           <FacebookShareButton url={`${window.location.origin}/post/${_id}`} quote={title}>
//             <FacebookIcon size={28} round />
//           </FacebookShareButton>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCard;



import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router";
import { FacebookShareButton, FacebookIcon } from "react-share";

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
  } = post;

  const date = new Date(createdAt).toLocaleDateString();
  const voteDiff = upVote - downVote;
  const tags = Array.isArray(tag) ? tag : tag ? [tag] : [];

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800 p-5 flex flex-col justify-between min-h-[360px]">
      
      {/* Top Section */}
      <div>
        {/* Author */}
        <div className="flex items-center gap-3 mb-3">
          <img src={authorImage} alt="author" className="w-10 h-10 rounded-full border-2 border-blue-500" />
          <div>
            <h4 className="font-semibold">{authorName}</h4>
            <p className="text-sm text-gray-400">{date}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-blue-400 line-clamp-2 mb-2">{title}</h3>

        {/* Description */}
        <p className="text-gray-300 text-sm line-clamp-3 mb-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs mb-2">
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
      <div className="flex justify-between items-center pt-3 border-t border-gray-700 mt-2 text-sm">
        <div className="flex gap-3 items-center">
          <span className="flex items-center gap-1 text-green-400"><FaArrowUp /> {upVote}</span>
          <span className="flex items-center gap-1 text-red-400"><FaArrowDown /> {downVote}</span>
          <span className="text-yellow-400">🔥 {voteDiff}</span>
          <span>💬 {commentCount}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/post/${_id}`} className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white">
            View details
          </Link>
          <FacebookShareButton url={`${window.location.origin}/post/${_id}`} quote={title}>
            <FacebookIcon size={28} round />
          </FacebookShareButton>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

