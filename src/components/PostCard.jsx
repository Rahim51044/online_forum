// import { FaArrowUp, FaArrowDown } from "react-icons/fa";

// const PostCard = ({ post }) => {
//   const {
//     authorImage,
//     authorName,
//     title,
//     description,
//     tag,
//     upVote,
//     downVote,
//     createdAt,
//   } = post;

//   const date = new Date(createdAt).toLocaleDateString();

//   return (
//     <div className="bg-gray-400 rounded shadow p-4 hover:shadow-md transition">
//       <div className="flex items-center gap-3 mb-2">
//         <img src={authorImage} alt="author" className="w-10 h-10 rounded-full" />
//         <div>
//           <h4 className="font-semibold">{authorName}</h4>
//           <p className="text-sm text-gray-500">{date}</p>
//         </div>
//       </div>
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-gray-700 mb-3">{description.slice(0, 120)}...</p>
//       <div className="flex items-center justify-between text-sm">
//         <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">#{tag}</span>
//         <div className="flex gap-3 items-center">
//           <span className="flex items-center gap-1 text-green-600"><FaArrowUp /> {upVote}</span>
//           <span className="flex items-center gap-1 text-red-500"><FaArrowDown /> {downVote}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCard;






// ✅ PostCard.jsx
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

  return (
    <div className="bg-base-100 p-4 rounded shadow hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-2">
        <img src={authorImage} alt="author" className="w-10 h-10 rounded-full" />
        <div>
          <h4 className="font-semibold">{authorName}</h4>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-2">{description?.slice(0, 100)}...</p>
      <p className="text-sm mb-2">
        {Array.isArray(tag) ? tag.join(", ") : tag ? `#${tag}` : "No Tag"}
      </p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-3 items-center">
          <span className="flex items-center gap-1 text-green-600">
            <FaArrowUp /> {upVote}
          </span>
          <span className="flex items-center gap-1 text-red-500">
            <FaArrowDown /> {downVote}
          </span>
          <span>🔥 {upVote - downVote}</span>
          <span>💬 {commentCount}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Link to={`/post/${_id}`} className="btn btn-sm btn-primary">
            View Details
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