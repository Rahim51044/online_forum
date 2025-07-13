import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const PostCard = ({ post }) => {
  const {
    authorImage,
    authorName,
    title,
    description,
    tag,
    upVote,
    downVote,
    createdAt,
  } = post;

  const date = new Date(createdAt).toLocaleDateString();

  return (
    <div className="bg-gray-400 rounded shadow p-4 hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-2">
        <img src={authorImage} alt="author" className="w-10 h-10 rounded-full" />
        <div>
          <h4 className="font-semibold">{authorName}</h4>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-3">{description.slice(0, 120)}...</p>
      <div className="flex items-center justify-between text-sm">
        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">#{tag}</span>
        <div className="flex gap-3 items-center">
          <span className="flex items-center gap-1 text-green-600"><FaArrowUp /> {upVote}</span>
          <span className="flex items-center gap-1 text-red-500"><FaArrowDown /> {downVote}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
